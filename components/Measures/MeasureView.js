import React, { useEffect, useState } from "react";
import BasicButton from "../BasicButton";
import ToggleSwitch from "../ToggleSwitch";
import Modal from "react-modal";

function UserView({ unitTypes, classTypes, unitID, setShow, setEditing, setViewing }) {
	const [unitName, setUnitName] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [unitTypeID, setUnitTypeID] = useState("");
	const [classTypeID, setClassTypeID] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		fetch("/api/findMeasure/" + unitID, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("RECEIVED DATA:", data);
				setUnitName(data.unitName);
				setAbbreviation(data.abbreviation);
				setUnitTypeID(data.unitTypeID);
				setClassTypeID(data.classTypeID);
				setIsDisabled(data.disabled);
			});
	}, [unitID]);

	function cancelForm() {
		setShow("button");
		setViewing("");
	}

	function editForm() {
		setShow("edit");
		setEditing(unitID);
	}

	function showDisabled() {
		if (isDisabled) {
			return (
				<div className="status-container-disabled">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.87868 0.87868C2.05025 -0.292893 3.94975 -0.292893 5.12132 0.87868L12 7.75736L18.8787 0.87868C20.0503 -0.292893 21.9497 -0.292893 23.1213 0.87868C24.2929 2.05025 24.2929 3.94975 23.1213 5.12132L16.2426 12L23.1213 18.8787C24.2929 20.0503 24.2929 21.9497 23.1213 23.1213C21.9497 24.2929 20.0503 24.2929 18.8787 23.1213L12 16.2426L5.12132 23.1213C3.94975 24.2929 2.05025 24.2929 0.87868 23.1213C-0.292893 21.9497 -0.292893 20.0503 0.87868 18.8787L7.75736 12L0.87868 5.12132C-0.292893 3.94975 -0.292893 2.05025 0.87868 0.87868Z"
							fill="black"
						/>
					</svg>
				</div>
			);
		} else {
			return (
				<div className="status-container-enabled">
					<svg
						viewBox="0 0 30 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M28.8148 1.03679C30.3257 2.48475 30.4022 4.91062 28.9858 6.45511L14.9233 21.7884C13.5333 23.304 11.2152 23.4119 9.69616 22.0317L1.25867 14.3651C-0.289259 12.9585 -0.428686 10.5356 0.947254 8.95327C2.32319 7.37094 4.69346 7.22841 6.24139 8.63493L11.9494 13.8215L23.5142 1.21157C24.9307 -0.332925 27.3038 -0.411179 28.8148 1.03679Z"
							fill="black"
						/>
					</svg>
				</div>
			);
		}
	}

	return (
		<>
			<form className="user-create-main-container">
				<div className="user-create-top-container">
					<h1>VIEW MEASURE</h1>
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
				{/* Unit Name: */}
				<label htmlFor="unitName">
					Name:
				</label>
				<input 
					type="text" 
					id="unitName" 
					value={unitName} 
					disabled
				></input>
				{/* Abbreviation: */}
				<label htmlFor="abbreviation">
					Abbreviation: <span className="required-mark">*</span>
				</label>
				<input
					type="text"
					id="abbreviation"
					value={abbreviation}
					// onChange={(e) => setUnitName(e.target.value)}
					disabled
				></input>
				{/* {error && firstName.length == 0 ? (
					<span className="user-create-error">Input First Name</span>
				) : (
					<></>
				)} */}
				{/* Unit Type: */}
				<label htmlFor="unitType">
					Type: <span className="required-mark">*</span>
				</label>
				<select
					className="sort-dropdown"
					id="user-create-role"
					// onChange={(e) => setRoleID(e.target.value)}
					disabled
				>
					{unitTypes.map((type) => {
						if (type.UnitTypeID == unitTypeID) {
							return (
								<option key={type.UnitTypeID} value={type.UnitTypeID} selected>
									{type.UnitTypeName}
								</option>
							);
						} else {
							return (
								<option key={type.UnitTypeID} value={type.UnitTypeID}>
									{type.UnitTypeName}
								</option>
							);
						}
					})}
				</select>
				{/* {error && lastName.length == 0 ? (
					<span className="user-create-error">Input Last Name</span>
				) : (
					<></>
				)} */}
				{/* Class Type: */}
				<label htmlFor="unitClass">
					Class: <span className="required-mark">*</span>
				</label>
				<select
					className="sort-dropdown"
					id="user-create-role"
					// onChange={(e) => setRoleID(e.target.value)}
					disabled
				>
					{classTypes.map((unitClass) => {
						if (unitClass.ClassTypeID == classTypeID) {
							return (
								<option key={unitClass.ClassTypeID} value={unitClass.ClassTypeID} selected>
									{unitClass.ClassTypeName}
								</option>
							);
						} else {
							return (
								<option key={unitClass.ClassTypeID} value={unitClass.ClassTypeID}>
									{unitClass.ClassTypeName}
								</option>
							);
						}
					})}
				</select>
				
				<span>Status:</span>
				{showDisabled()}
				<div className="user-create-button-container">
					<BasicButton
						label={"Edit"}
						color={"green"}
						type={"button"}
						clickFunction={editForm}
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

export default UserView;
