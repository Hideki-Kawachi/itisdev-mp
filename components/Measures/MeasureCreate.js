import React, { useEffect, useState } from "react";
import BasicButton from "../BasicButton";
import ToggleSwitch from "../ToggleSwitch";

function MeasureCreate ({ unitTypes, classTypes, setShow }) {
	const [unitID, setUnitID] = useState("");
	const [unitName, setUnitName] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [unitTypeID, setUnitTypeID] = useState("20001");
	const [classTypeID, setClassTypeID] = useState("30001");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [employeeIDError, setEmployeeIDError] = useState("");

	function submitForm() {
		if (
			unitName.length == 0 ||
			abbreviation.length == 0 ||
			unitTypeID.length == 0 ||
			classTypeID.length == 0
		) {
			setError(true);
		} else {
			let measureData = {
				unitID: "10001",
				unitName: unitName,
				abbreviation: abbreviation,
				unitTypeID: unitTypeID,
				classTypeID: classTypeID,
				disabled: isDisabled,
			};

			fetch("/api/measures/createMeasure", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(measureData),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data == "created") {
						console.log("SUCCESS");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
						setEmployeeIDError(data);
					}
				});
		}
	}

	function cancelForm() {
		setShow("button");
	}

	// function showEmployeeIDError() {
	// 	if (error) {
	// 		//employee ID is empty
	// 		if (employeeID.length == 0) {
	// 			return <span className="user-create-error">Input Employee ID</span>;
	// 		}
	// 		//employee ID is too short
	// 		else if (employeeID.length != 8) {
	// 			return (
	// 				<span className="user-create-error">
	// 					Employee ID must be 8 numbers long
	// 				</span>
	// 			);
	// 		}
	// 	}
	// }

	return (
		<>
			<form className="user-create-main-container">
				<div className="user-create-top-container">
					<h1>CREATE NEW MEASURE</h1>
					<button className="user-create-exit-button" onClick={cancelForm}>
						<svg
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11.2732 0.875369C11.8209 1.42306 11.8209 2.31104 11.2732 2.85874L8.05752 6.07441L11.2732 9.29009C11.8209 9.83778 11.8209 10.7258 11.2732 11.2735C10.7255 11.8211 9.83751 11.8211 9.28982 11.2735L6.07415 8.05778L2.85847 11.2735C2.31078 11.8211 1.4228 11.8211 0.875105 11.2735C0.327413 10.7258 0.327413 9.83778 0.875105 9.29009L4.09078 6.07441L0.875106 2.85874C0.327413 2.31104 0.327414 1.42306 0.875106 0.875368C1.4228 0.327676 2.31078 0.327676 2.85847 0.875368L6.07415 4.09104L9.28982 0.875368C9.83751 0.327677 10.7255 0.327677 11.2732 0.875369Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>

				{/* Name Field */}
				<label htmlFor="unitName">
					Name: <span className="required-mark">*</span>
				</label>
				<input
					type="text"
					id="unitName"
					onChange={(e) => setUnitName(e.target.value)}
				></input>
				{error && unitName.length == 0 ? (
					<span className="user-create-error">Input First Name</span>
				) : (
					<></>
				)}
				{/* {showEmployeeIDError()} */}
				{/* {employeeIDError == employeeID && employeeID.length > 0 ? (
					<span className="user-create-error">
						Employee ID has already been used
					</span>
				) : (
					<></>
				)} */}

				{/* Abbreviation Field */}
				<label htmlFor="abbreviation">
					Abbreviation: <span className="required-mark">*</span>
				</label>
				<input
					type="text"
					id="abbreviation"
					onChange={(e) => setAbbreviation(e.target.value)}
				></input>
				{error && abbreviation.length == 0 ? (
					<span className="user-create-error">Input First Name</span>
				) : (
					<></>
				)}

				{/* Unit Type Field */}
				<label htmlFor="type">
					Type: <span className="required-mark">*</span>
				</label>
				<select
					className="sort-dropdown"
					id="user-create-role"
					defaultValue={"20001"}
					onChange={(e) => setUnitTypeID(e.target.value)}
				>
					{unitTypes.map((type) => (
						<option key={type.UnitTypeID} value={type.UnitTypeID}>
							{type.UnitTypeName}
						</option>
					))}
				</select>

				{/* Unit Class Type Field */}
				<label htmlFor="Class">
					Class: <span className="required-mark">*</span>
				</label>
				<select
					className="sort-dropdown"
					id="user-create-role"
					defaultValue={"30001"}
					onChange={(e) => setClassTypeID(e.target.value)}
				>
					{classTypes.map((unitClass) => (
						<option key={unitClass.ClassTypeID} value={unitClass.ClassTypeID}>
							{unitClass.ClassTypeName}
						</option>
					))}
				</select>

				<span>Status:</span>
				<ToggleSwitch
					disabled={isDisabled}
					setDisabled={setIsDisabled}
				></ToggleSwitch>

				<div className="user-create-button-container">
					<BasicButton
						label={"Save"}
						color={"green"}
						type={"button"}
						clickFunction={submitForm}
					></BasicButton>
					<BasicButton
						label={"Cancel"}
						color={"gray"}
						type={"reset"}
						clickFunction={cancelForm}
					></BasicButton>
				</div>
			</form>
		</>
	);
}

export default MeasureCreate;
