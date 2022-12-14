import React, { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import BasicTableAdd from "./InventoryTable";
import BasicTablePull from "./InventoryTablePull";
import BasicButton from "../BasicButton";
import Cancel from "../Pop-up/cancel";

function PullInventoryCreate({ unit, brand, supplier }) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [vTypeOpen, setvTypeOpen] = useState(false);
	const [otype, setOType] = useState();
	const [name, setName] = useState("");
	const [cancel, setCancel] = useState(false);

	const [lessRecordID, setLessRecordID] = useState("");
	const [pullDate, setPullDate] = useState("");
	const [JOnumber, setJOnumber] = useState("");
	const [itemID, setItemID] = useState("");
	const [plateNum, setPlateNum] = useState("");
	const [mechanicName, setMechanicName] = useState("");
	const [remarks, setRemarks] = useState("");
	const [creatorID, setCreatorID] = useState("");
	const [editorID, setEditorID] = useState("");
	const [editDate, setEditDate] = useState("");
	const [notifResult, setNotifResult] = useState("");
	const [error, setError] = useState(false);
	const [JOnumberError, setJOnumberError] = useState("");
	const [itemIDErorr, setItemIDError] = useState("");
	const [plateNumError, setPlateNumError] = useState("");
	const currentUserID = "00000001";
	const curr = new Date();
	curr.setDate(curr.getDate());
	const date = curr.toISOString().substring(0, 10);
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	function submitForm() {
		// console.log("1. Error is " + error + ", Data is " + data);
		console.log("clicked", mechanicName.length);
		if (
			pullDate.length == 0 ||
			JOnumber.length == 0 ||
			plateNum.length == 0 ||
			mechanicName.length == 0
		) {
			setError(true);
		} else {
			let pullInvData = {
				lessRecordID: lessRecordID,
				pullDate: new Date(pullDate),
				JOnumber: JOnumber,
				plateNum: plateNum,
				mechanicName: mechanicName,
				creatorID: currentUserID,
				editorID: null,
				creationDate: new Date(),
				disabled: false,
			};
			console.log("pull data", pullInvData);
			fetch("/api/inventory/pullInventory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pullInvData),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data == "created") {
						console.log("SUCCESS");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
					}
				});
		}
	}
	function cancelForm() {
		setCancel(true);
	}

	function checkSpecial() {
		const specialChars = `/[!@#$%^&* ()_+\-=\[\]{};':"\\|,.<>\/?]+/;`;
		return specialChars.split("").some((char) => plateNum.includes(char)); // true if present and false if not
	}

	function showJOnumberError() {
		if (error) {
			//JO Number is Empty
			if (JOnumber.length == 0) {
				return (
					<span className="vehicle-create-error">Input Job Order Number</span>
				);
			}
			//JO Number reached max char length
			else if (JOnumber.length > 15 || JOnumber.length < 15) {
				return (
					<span className="vehicle-create-error">
						Job Order Number must be 15 numbers long.
					</span>
				);
			}
		}
	}

	function showItemIDError() {
		if (error) {
			//Item ID Number is Empty
			if (itemID.length == 0) {
				return <span className="vehicle-create-error">Input Item Code</span>;
			}
			//Item ID Number reached max char length
			else if (itemID.length > 10 || itemID.length < 10) {
				return (
					<span className="vehicle-create-error">
						Item Code must be 10 characters long.
					</span>
				);
			}
		}
	}

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
	function showPlateNumError() {
		// console.log("Plate Number has special chars: " + checkSpecial());

		if (error) {
			//plateNum is Empty
			if (plateNum.length == 0) {
				return <span className="vehicle-create-error">Input Plate Number</span>;
			} else if (checkSpecial()) {
				return (
					<span className="vehicle-create-error">
						Must not contain spaces or special characters
					</span>
				);
			}
			//plateNum reached max char length
			else if (plateNum.length > 7 || plateNum.length < 5) {
				return (
					<span className="vehicle-create-error">
						Plate number must be 5 to 7 characters long
					</span>
				);
			}
		}
	}
	return (
		<>
			<div className="container">
				<div className="content-tabs">
					<BasicTablePull> </BasicTablePull>

					{/* First Field Group */}
					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">Pull-out Date: </label> <br />
							<input
								type="date"
								defaultValue={date}
								className="form-fields"
								placeholder="Acquired Date"
								onChange={(e) => setPullDate(e.target.value)}
							/>
						</div>

						<div className="form-item">
							<label className="form-labels">
								Job Order Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<label className="label-format"> Format: Numbers only. </label>{" "}
							<br />
							<input
								type="number"
								className="form-fields"
								placeholder="Enter Job Order Number"
								onChange={(e) => setJOnumber(e.target.value)}
							/>
							{showJOnumberError()}
							{JOnumberError == JOnumber && JOnumber.length > 0 ? (
								<span className="vehicle-create-error">
									Job Order Number has already been registered.
								</span>
							) : (
								<></>
							)}
						</div>

						<div className="form-item">
							<label className="form-labels">
								Plate Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<label className="label-format">
								{" "}
								Format: Exclude spaces and dashes.{" "}
							</label>{" "}
							<br />
							<input
								type="text"
								className="form-fields"
								placeholder="Enter Plate Number"
								onChange={(e) => setPlateNum(e.target.value)}
							/>
							{showPlateNumError()}
							{plateNumError == plateNum && plateNum.length > 0 ? (
								<span className="vehicle-create-error">
									Plate Number has already been registered
								</span>
							) : (
								<></>
							)}
						</div>

						<div className="form-item">
							<label className="form-labels">Mechanic Name: </label> <br />
							<input
								type="text"
								className="form-fields"
								onChange={(e) => setMechanicName(e.target.value)}
							/>
						</div>
					</div>
					<hr />

					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Item Code: <label className="required"> * </label>{" "}
							</label>{" "}
							<label className="label-format">
								{" "}
								Format: Numbers and characters.{" "}
							</label>{" "}
							<br />
							<input
								type="text"
								className="form-fields"
								placeholder="Enter Item Code"
								onChange={(e) => setItemID(e.target.value)}
							/>
							{showItemIDError()}
						</div>

						<div className="form-item">
							<label className="form-labels">
								Item Name: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>
					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Brand: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Part Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>
					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Quantity: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Unit: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<br />
					<button className="gray-button-container1"> Add to Pull Cart</button>
					<br />
					<br />
					<hr />
					<br />
					<div className="form-item">
						<label className="form-labels">Remarks:</label> <br />
						<input type="textarea" className="form-fields-remarks" />
					</div>
				</div>
			</div>
			<br />

			{/* Buttons */}
			<div className="form-container">
				<span className="required-text">
					Fields marked with <label className="required"> * </label> are
					required.
				</span>
				<span className="form-item-buttons">
					<BasicButton
						label={"Cancel"}
						color={"gray"}
						type={"reset"}
						clickFunction={cancelForm}
					></BasicButton>
					<BasicButton
						label={"Save"}
						color={"green"}
						type={"button"}
						clickFunction={submitForm}
					></BasicButton>
				</span>
			</div>
		</>
	);
}

export default PullInventoryCreate;
