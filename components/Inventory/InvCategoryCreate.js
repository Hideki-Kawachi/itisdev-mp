import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch";

function AddInventoryCategory({ trigger, setTrigger, name, type, id }) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [defaultID, setDefaultID] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const [error, setError] = useState(false);
	const [nameError, setNameError] = useState("");
	const [notifResult, setNotifResult] = useState("");

	function submitForm() {
		if (categoryName.length == 0) setError(true);
		else {
			let categoryData = {
				[id]: defaultID,
				supplierName: categoryName,
				disabled: isDisabled,
			};

			console.log("ERRORRRR" + nameError);
			fetch("/api/inventory/categories/create" + name.replace(/ /g, ""), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(categoryData),
			})
				.then((res) => res.json())
				.then((data) => {
					//    console.log(JSON.stringify(categoryData));
					if (data == "created") {
						console.log("SUCCESS");
						setNotifResult("Successfully created!");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
						setNameError(data);
						console.log("Duplicate ID is" + nameError);
					}
				});
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

	useEffect(() => {
		if (type.length == 0) {
			if (name == "Brand") setDefaultID("60000");
			else if (name == "Unit") setDefaultID("70000");
			else if (name == "Add Supplier") setDefaultID("1001");
			console.log(defaultID + " Empty Collection: " + name.replace(/ /g, ""));
		} else {
			setDefaultID(
				String(Math.max(...type.map((type) => JSON.parse(type[id]))) + 1)
			);
			console.log(defaultID + " " + name.replace(/ /g, ""));
		}
	}, [defaultID]);

	return (
		<>
			<div className="item-modal">
				{showResult()}
				<div className="item-header item-modal-header">
					<div className="item-column-container">
						<h1>{name}</h1>
						<h2>ADD OPTION</h2>
					</div>
					<button
						className="item-icon-button item-x-button"
						onClick={() => setTrigger(!trigger)}
					>
						X
					</button>
				</div>

				<div className="item-input">
					<label htmlFor="itemName">Category Name:</label>
					<input
						type="text"
						className="form-fields"
						placeholder="Enter Category Name"
						onChange={(e) => setCategoryName(e.target.value)}
					/>
				</div>
				<div className="item-input" id="item-status">
					<label htmlFor="disabled">Status:</label>
					<ToggleSwitch
						disabled={isDisabled}
						setDisabled={setIsDisabled}
					></ToggleSwitch>
				</div>
				<button
					className="green-button-container add-button"
					id="item-modal-button"
					onClick={() => submitForm()}
				>
					Add
				</button>
			</div>
		</>
	);
}

export default AddInventoryCategory;
