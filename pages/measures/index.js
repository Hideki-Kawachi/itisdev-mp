import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BasicButton from "../../components/BasicButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import MeasureCard from "../../components/Measures/MeasureCard";
import MeasureCreate from "../../components/Measures/MeasureCreate";
import MeasureEdit from "../../components/Measures/MeasureEdit";
import dbConnect from "../../lib/dbConnect";
//schemas
import Measure from "../../models/MeasureSchema";
import UnitType from "../../models/UnitTypeSchema";
import UnitConvertion from "../../models/UnitConvertionSchema";

export async function getServerSideProps() {
	await dbConnect();
	//get measures
	const measureList = await Measure.find(
	  {},
	  {
		unitID: 1,
		unitName: 1,
		unitTypeID: 1,
		disabled: 1,
	  }
	);
	
	const unitTypeList = await UnitType.find(
	  {},
	  {
		UnitTypeID: 1,
		UnitTypeName: 1,
		disabled: 1,
	   }
	);
	
	 const unitConversionList = await UnitConvertion.find(
	  {},
	  {
		parentUnit: 1,
		childUnit: 1,
		disabled: 1,
	  }
	);
  
   let measureData = JSON.stringify(measureList);
   let unitTypeData = JSON.stringify(unitTypeList);
   let unitConversionData = JSON.stringify(unitConversionList);
  
	return { props: { measureData, unitTypeData, unitConversionData } };
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
