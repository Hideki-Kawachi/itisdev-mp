import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BasicButton from "../../components/BasicButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import UserCard from "../../components/Users/UserCard";
import UserCreate from "../../components/Users/UserCreate";
import UserEdit from "../../components/Users/UserEdit";
import { ironOptions } from "../../lib/config";
import dbConnect from "../../lib/dbConnect";
import Role from "../../models/RoleSchema";
import User from "../../models/UserSchema";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			const currentUser = req.session.user;

			if (currentUser.roleID === "0000") {
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
				return { props: { userData, roleData, currentUser } };
			}
		}
		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

function Users({ userData, roleData, currentUser }) {
	const users = JSON.parse(userData);
	const roles = JSON.parse(roleData);

	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [rightShow, setRightShow] = useState("button");
	const [isEditing, setIsEditing] = useState("");
	const [userShow, setUserShow] = useState(users);
	const [notifResult, setNotifResult] = useState("");

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

	useEffect(() => {
		if (notifResult.length > 0) {
			console.log("result is:", notifResult);
			setTimeout(() => setNotifResult(""), 3000);
		}
	}, [notifResult]);

	const rightContainerShow = {
		edit: (
			<UserEdit
				roles={roles}
				userID={isEditing}
				setShow={setRightShow}
				setEditing={setIsEditing}
				setNotifResult={setNotifResult}
			></UserEdit>
		),
		create: (
			<UserCreate
				roles={roles}
				setShow={setRightShow}
				currentUser={currentUser}
			></UserCreate>
		),
		button: (
			<BasicButton
				label={"Create User"}
				color={"green"}
				clickFunction={() => setRightShow("create")}
				type={"button"}
			></BasicButton>
		),
	};

	function showResult() {
		if (notifResult.length > 0) {
			return (
				<div className="top-notification-container">
					<span>{notifResult}</span>
				</div>
			);
		} else {
			return <></>;
		}
	}

	return (
		<>
			<Header page={"USERS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				{showResult()}
				<div className="user-main-container">
					<div className="user-left-container">
						<input
							type="search"
							id="user"
							className="search-bar"
							placeholder="Search Name"
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
								<UserCard
									key={user.userID}
									userID={user.userID}
									firstName={user.firstName}
									lastName={user.lastName}
									roleName={user.roleName}
									disabled={user.disabled}
									setEditing={setIsEditing}
								></UserCard>
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
