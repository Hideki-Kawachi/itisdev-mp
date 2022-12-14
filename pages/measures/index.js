import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BasicButton from "../../components/BasicButton";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import MeasureCard from "../../components/Measures/MeasureCard";
import MeasureCreate from "../../components/Measures/MeasureCreate";
import MeasureEdit from "../../components/Measures/MeasureEdit";
import MeasureView from "../../components/Measures/MeasureView";
import dbConnect from "../../lib/dbConnect";
//schemas
import Measure from "../../models/MeasureSchema";
import UnitType from "../../models/UnitTypeSchema";
import ClassType from "../../models/UnitClassTypeSchema";
import UnitConvertion from "../../models/UnitConvertionSchema";

import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			if (currentUser.roleID === "0002") {
				//if employee
				return {
					redirect: { destination: "/", permanent: true },
					props: {},
				};
			} else {
				await dbConnect();
				//get measures
				const measureList = await Measure.find(
					{},
					{
						unitID: 1,
						unitName: 1,
						abbreviation: 1,
						unitTypeID: 1,
						classTypeID: 1,
						disabled: 1,
					}
				);
				//get unitTypes
				const unitTypeList = await UnitType.find(
					{},
					{
						UnitTypeID: 1,
						UnitTypeName: 1,
						disabled: 1,
					}
				);
				//get classTypes
				const classTypeList = await ClassType.find(
					{},
					{
						ClassTypeID: 1,
						ClassTypeName: 1,
						disabled: 1,
					}
				);
				//get unitConversionList
				const unitConversionList = await UnitConvertion.find(
					{},
					{
						parentUnit: 1,
						childUnit: 1,
						disabled: 1,
					}
				);

				var tempMeasureData = [];

				measureList.forEach((measure) => {
					let isFound1 = false;
					let unitTypeName = "";
					while (!isFound1) {
						unitTypeList.forEach((unit) => {
							if (unit.UnitTypeID == measure.unitTypeID) {
								unitTypeName = unit.UnitTypeName;
								isFound1 = true;
							}
						});
					}

					let isFound2 = false;
					let classTypeName = "";
					while (!isFound2) {
						classTypeList.forEach((unitClass) => {
							if (unitClass.ClassTypeID == measure.classTypeID) {
								classTypeName = unitClass.ClassTypeName;
								isFound2 = true;
							}
						});
					}

					tempMeasureData.push({
						unitID: measure.unitID,
						unitName: measure.unitName,
						abbreviation: measure.abbreviation,
						unitTypeName: unitTypeName,
						classTypeName: classTypeName,
						disabled: measure.isDisabled,
					})
				});

				let measureData = JSON.stringify(tempMeasureData);
				let unitTypeData = JSON.stringify(unitTypeList);
				let classTypeData = JSON.stringify(classTypeList);
				let unitConversionData = JSON.stringify(unitConversionList);

				return {
					props: { measureData, unitTypeData, classTypeData, unitConversionData, currentUser },
				};
			}
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

function Measures({ measureData, unitTypeData, classTypeData, unitConversionData, currentUser }) {
	const measures = JSON.parse(measureData);
	const unitTypes = JSON.parse(unitTypeData);
	const classTypes = JSON.parse(classTypeData);
	const unitConversions = JSON.parse(unitConversionData);
	const newMeasureID = Math.max(...measures.map((measures) => (measures.unitID))) + 1;

	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [rightShow, setRightShow] = useState("button");
	const [isEditing, setIsEditing] = useState("");
	const [isViewing, setIsViewing] = useState("");
	const [measureShow, setMeasureShow] = useState(measures);
	const [notifResult, setNotifResult] = useState("");

	useEffect(() => {
		getSearch(search);
	}, [filter]);

	function getSearch(value) {
		let tempList = [];
		measures.forEach((measure) => {
			if (
				(measure.unitName.toLowerCase().includes(value)) &&
				(measure.roleName == filter || filter == "All")
			) {
				tempList.push(measure);
			}
		});
		setMeasureShow(tempList);
	}

	useEffect(() => {
		if (isEditing.length > 0) {
			setRightShow("edit");
			setIsViewing("");
		} else if (isViewing.length > 0) {
			setRightShow("view");
			setIsEditing("");
		} else {
			setRightShow("button");
		}
	}, [isEditing, isViewing]);

	useEffect(() => {
		if (notifResult.length > 0) {
			console.log("result is:", notifResult);
			setTimeout(() => setNotifResult(""), 3000);
		}
	}, [notifResult]);

	const rightContainerShow = {
		edit: (
			<MeasureEdit
				unitTypes={unitTypes}
				classTypes={classTypes}
				unitID={isEditing}
				setShow={setRightShow}
				setEditing={setIsEditing}
				setNotifResult={setNotifResult}
			></MeasureEdit>
		),
		create: (
			<MeasureCreate 
				unitTypes={unitTypes}
				classTypes={classTypes}
				newMeasureID={newMeasureID}
				setShow={setRightShow}
			></MeasureCreate>
		),
		view: (
			<MeasureView
				unitTypes={unitTypes}
				classTypes={classTypes}
				unitID={isViewing}
				setShow={setRightShow}
				setViewing={setIsViewing}
				setEditing={setIsEditing}
			></MeasureView>
		),
		button: (
			<BasicButton
				label={"Create Measure"}
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
			<Header page={"MEASURES"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<div className="user-main-container">
					<div className="user-left-container">
						<input
							type="search"
							id="unit"
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
							{unitTypes.map((unitType) => (
								<option key={unitType.UnitTypeID} value={unitType.UnitTypeName}>
									{unitType.UnitTypeName}
								</option>
							))}
						</select>
						<div className="user-list-container">
							{measureShow.map((measure) => (
								<MeasureCard
									key={measure.unitID}
									unitID={measure.unitID}
									unitName={measure.unitName}
									abbreviation={measure.abbreviation}
									unitTypeName={measure.unitTypeName}
									classTypeName={measure.classTypeName}
									disabled={measure.disabled}
									setViewing={setIsViewing}
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

export default Measures;
