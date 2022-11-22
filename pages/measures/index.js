import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BasicButton from "../../components/BasicButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import MeasureCard from "../../components/Measures/MeasureCard";
import MeasureCreate from "../../components/Measures/MeasureCreate";
import MeasureEdit from "../../components/Measures/MeasureEdit";
import dbConnect from "../../lib/dbConnect";
import Role from "../../models/RoleSchema";
import User from "../../models/UserSchema";

export async function getServerSideProps() {
	await dbConnect();

	const userList = await User.find(
		{},
		{ userID: 1, firstName: 1, lastName: 1, roleID: 1, disabled: 1 }
	);
	const roleList = await Role.find({}, { roleID: 1, roleName: 1 });

	var tempUserData = [];

	userList.forEach((user) => {
		let isFound = false;
		let roleName = "";
		while (!isFound) {
			roleList.forEach((role) => {
				if (role.roleID == user.roleID) {
					roleName = role.roleName;
					isFound = true;
				}
			});
		}
		tempUserData.push({
			userID: user.userID,
			firstName: user.firstName,
			lastName: user.lastName,
			roleName: roleName,
			disabled: user.disabled,
		});
	});

	let userData = JSON.stringify(tempUserData);
	let roleData = JSON.stringify(roleList);

	return { props: { userData, roleData } };
}

function Users({ userData, roleData }) {
	const users = JSON.parse(userData);
	const roles = JSON.parse(roleData);

	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [rightShow, setRightShow] = useState("button");
	const [isEditing, setIsEditing] = useState("");
	const [userShow, setUserShow] = useState(users);

	useEffect(() => {
		getSearch(search);
	}, [filter]);

	function getSearch(value) {
		let tempList = [];
		users.forEach((user) => {
			if (
				(user.firstName.toLowerCase().includes(value) ||
					user.lastName.toLowerCase().includes(value)) &&
				(user.roleName == filter || filter == "All")
			) {
				tempList.push(user);
			}
		});
		setUserShow(tempList);
	}

	useEffect(() => {
		if (isEditing.length > 0) {
			setRightShow("edit");
		}
	}, [isEditing]);

	const rightContainerShow = {
		edit: (
			<MeasureEdit
				roles={roles}
				userID={isEditing}
				setShow={setRightShow}
			></MeasureEdit>
		),
		create: <MeasureCreate roles={roles} setShow={setRightShow}></MeasureCreate>,
		button: (
			<BasicButton
				label={"Create Measure"}
				color={"green"}
				clickFunction={() => setRightShow("create")}
				type={"button"}
			></BasicButton>
		),
	};

	return (
		<>
			<Header page={"MEASURES"} subPage={"HOME"} user={"Example N. Name"}></Header>
			<NavBar></NavBar>
			<div id="main-container">
				<div className="user-main-container">
					<div className="user-left-container">
						<input
							type="search"
							id="user"
							className="search-bar"
							placeholder="Search Unit"
							onChange={(e) => {
								setSearch(e.target.value);
								if (e.target.value.length == 0) {
									getSearch("");
								}
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									getSearch(search);
								}
							}}
						></input>
						<select
							className="sort-dropdown"
							id="role-filter"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
						>
							<option value="All">All</option>
							{roles.map((role) => (
								<option key={role.roleID} value={role.roleName}>
									{role.roleName}
								</option>
							))}
						</select>
						<div className="user-list-container">
							{userShow.map((user) => (
								<MeasureCard
									key={user.userID}
									userID={user.userID}
									firstName={user.firstName}
									lastName={user.lastName}
									roleName={user.roleName}
									disabled={user.disabled}
									setEditing={setIsEditing}
								></MeasureCard>
							))}
						</div>
					</div>
					<div className="user-right-container">
						{rightContainerShow[rightShow]}
					</div>
				</div>
			</div>
		</>
	);
}

export default Users;
