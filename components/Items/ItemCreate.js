import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-modal";
import ToggleSwitch from "../ToggleSwitch";
import ItemCatTable from "./CategoryList";
import BrandTable from "./BrandTable";
import Info from "../../components/Pop-up/info";

// TO-DO: add dropdown options as parameters
function ItemCreate({ items, categories, brands, units, currentUser }) {
	// Item Identification
	const [itemID, setItemID] = useState("");
	const [categoryID, setCategoryID] = useState("");
	const [name, setName] = useState("");
	const [model, setModel] = useState("");
	const [unitID, setUnitID] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [minQuantity, setMinQuantity] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);
	const currentUserID = currentUser.userID;
	// Item Details
	const [details, setDetails] = useState({
		combinationID: String(Math.floor(Math.random() * 50000)),
		brand: "",
		partNumber: "",
		quantity: 0,
		unit: "",
		disabled: false,
	});
	const [detailsArray, setDetailsArray] = useState([{}]);

	// Modals
	const [modStatus, setModStatus] = useState(false);
	const [modType, setModType] = useState("");
	const [modName, setModName] = useState("");
	const [modID, setModID] = useState("");

	// Errors
	const [error, setError] = useState(false);
	const [codeError, setCodeError] = useState("");
	const [detailsError, setDetailsError] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);

	// Others
	const [notifResult, setNotifResult] = useState("");
	const [infoPop, setInfoPop] = useState(false);
	const [cancel, setCancel] = useState(false);

	// Submit Form
	function submitForm() {
		// console.log("1. Error is " + error + ", Data is " + data);
		revertBrandToID();
		if (
			itemID.length == 0 ||
			categoryID.length == 0 ||
			name.length == 0 ||
			unitID.length == 0 ||
			quantity == 0
		) {
			setError(true);
		} else {
			let itemData = {
				itemID: itemID,
				categoryID: categoryID,
				itemName: name,
				itemModel: model,
				unitID: unitID,
				quantity: quantity,
				minQuantity: minQuantity,
				creatorID: currentUserID,
				disabled: isDisabled,
			};

			fetch("/api/items/createItem", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemData, details: detailsArray }),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data == "created") {
						console.log("SUCCESS");
						setNotifResult("Successfully created!");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
						setCodeError(data);
					}
				});
		}
	}

	function convertBrandID(value) {
		brands.every((brand) => {
			if (value == brand.itemBrandID) {
				value = brand.name;
				return false;
			}
			return true;
		});

		return value;
	}

	function revertBrandToID() {
		detailsArray.every((value) => {
			brands.every((brand) => {
				if (value.brand == brand.name) {
					value.brand = brand.itemBrandID;
					return false;
				}
				return true;
			});
			return true;
		});
	}

	// Handle details input
	function handleDetails(e) {
		const { name, value } = e.target;

		setDetails((prevState) => ({
			...prevState,
			combinationID: String(Math.floor(Math.random() * 50000)),
			[name]: value,
		}));

		if (name == "brand") {
			setDuplicateError(false);
		}
	}

	function clearDetails() {
		setDetails((prevState) => ({
			...prevState,
			combinationID: "",
			brand: "",
			partNumber: "",
			quantity: 0,
			unit: "",
			disabled: false,
		}));
	}

	function checkDetails() {
		return (
			details.brand.length == 0 ||
			details.partNumber.length == 0 ||
			details.quantity < 0
		);
	}

	function checkDuplicate() {
		let duplicate = false;
		detailsArray.every((value) => {
			if (value.brand == details.brand) {
				duplicate = true;
				return false;
			}
			return true;
		});
		return duplicate;
	}

	function addDetails() {
		if (JSON.stringify(detailsArray[0]) == "{}") {
			detailsArray.shift();
		}
		setDetailsError(checkDetails());
		setDuplicateError(checkDuplicate());
		if (!checkDetails() && !checkDuplicate()) {
			setDetailsArray((detailsArray) => [...detailsArray, details]);
			setQuantity(quantity + parseInt(details.quantity));
			clearDetails();
		}
	}

	function convertDetailsArray(type, arr) {
		if (type) {
			let template = {
				combinationID: "",
				brand: "",
				partNumber: "",
				quantity: 0,
				disabled: false,
			};
			let templateArray = [];
			arr.every((value) => {
				template.combinationID = value.combinationID;
				template.brand = convertBrandID(value.itemBrandID);
				template.partNumber = value.partNumber;
				template.quantity = value.quantity;
				template.disbaled = value.disabled;
				templateArray.push(template);
				return true;
			});

			return templateArray;
		}

		return arr;
	}

	function deleteRow(row) {
		setQuantity(quantity - parseInt(row.quantity));
		if (detailsArray.length > 1) {
			detailsArray.every((value) => {
				setDetailsArray(
					detailsArray.filter(
						(value) => value.combinationID != row.combinationID
					)
				);
			});
		} else {
			setDetailsArray([{}]);
		}
		clearDetails();
	}

	function cancelForm() {
		setCancel(true);
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

	function showRequiredError(errType, field, msg) {
		if (errType && field.length == 0) {
			return <span className="vehicle-create-error">{msg}</span>;
		}
	}

	function showMinLength(errType, field, msg, min) {
		if (errType && field.length < min) {
			return <span className="vehicle-create-error">{msg}</span>;
		}
	}

	function showNegativeNumError(errType, field, msg) {
		if (errType && field < 0) {
			return <span className="vehicle-create-error">{msg}</span>;
		}
	}

	function showDuplicateError(errType, field, msg) {
		if (errType) {
			return <span className="vehicle-create-error">{field + " " + msg}</span>;
		}
	}

	return (
		<>
			<Modal isOpen={modStatus} className="modal" ariaHideApp={false}>
				<ItemCatTable
					trigger={modStatus}
					setTrigger={setModStatus}
					name={modName}
					type={modType}
					id={modID}
				>
					{" "}
				</ItemCatTable>
			</Modal>
			<Modal isOpen={infoPop} className="modal" ariaHideApp={false}>
				<Info trigger={infoPop} setTrigger={setInfoPop}></Info>
			</Modal>
			<form className="item-column-container" id="item-add-main-container">
				{showResult()}
				{/* <button type="button" onClick={()=>calcTotalQty()}>Test</button> */}
				<h1>IDENTIFICATION</h1>

				<div id="add-item-form-identification">
					<div className="form-container">
						<div className="item-input">
							<div className="item-label-with-buttons">
								<label htmlFor="categoryID">
									Item Category: <label className="required"> * </label>
								</label>
								<button
									className="item-icon-button item-add-option-button "
									type="button"
									onClick={() => {
										setModStatus(true);
										setModName("Select Category");
										setModType(categories);
										setModID("categoryID");
									}}
								>
									✎
								</button>
							</div>
							<select
								className="sort-dropdown"
								id="user-create-role"
								onChange={(e) => setCategoryID(e.target.value)}
							>
								<option value="" key="00000" defaultValue hidden>
									{" "}
									Select Category{" "}
								</option>
								{categories.map((category) => {
									if (category.disabled == false) {
										return (
											<option
												key={category.categoryID}
												value={category.categoryID}
											>
												{category.name}
											</option>
										);
									}
								})}
							</select>
							{showRequiredError(error, categoryID, "Select Category")}
						</div>
						<div className="item-input">
							<label htmlFor="itemID">
								Item Code: <label className="required"> * </label>
							</label>
							<input
								type="text"
								name="itemID"
								value={itemID}
								onChange={(e) => setItemID(e.target.value)}
							/>
							{showRequiredError(error, itemID, "Input Item Code")}
							{showMinLength(error, itemID, "Item Code must be at least 5 characters", 5)}
							{codeError == itemID && itemID.length > 0 ? (
								<span className="vehicle-create-error">
									Item Code is already used
								</span>
							) : (
								<></>
							)}
						</div>
						<div className="item-input">
							<label htmlFor="itemName">
								Item Name: <label className="required"> * </label>
							</label>
							<input
								type="text"
								name="itemName"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							{showRequiredError(error, name, "Input Item Name")}
						</div>

						<div className="item-input" id="item-status">
							<label htmlFor="disabled">Status: 							
							<button
							type="button"
							className="table-info-button"
							onClick={() => setInfoPop(!infoPop)}
							>
							i
							</button>
							</label>						
							<ToggleSwitch
								disabled={isDisabled}
								setDisabled={setIsDisabled}
							></ToggleSwitch>
						</div>
					</div>

					<div className="form-container">
						<div className="item-input">
							<label htmlFor="itemModel">Item Model:</label>
							<input
								type="text"
								name="itemModel"
								value={model}
								onChange={(e) => setModel(e.target.value)}
							/>
						</div>

						<div className="item-input">
							<label htmlFor="minQuantity">Min. Quantity:</label>
							<input
								type="number"
								name="minQuantity"
								min="0"
								value={minQuantity}
								onChange={(e) => setMinQuantity(e.target.valueAsNumber)}
							/>
							{showNegativeNumError(
								error,
								minQuantity,
								"Input cannot be negative"
							)}
						</div>

						<div className="item-input">
							<div className="item-label-with-buttons">
								<label htmlFor="unitID">
									Unit: <label className="required"> * </label>
								</label>
							</div>
							{/* Insert Modal Here */}
							<select
								className="sort-dropdown"
								id="user-create-role"
								defaultValue={"0000"}
								onChange={(e) => setUnitID(e.target.value)}
							>
								<option value="" key="00001" defaultValue hidden>
									{" "}
									Select Unit{" "}
								</option>

								{units.map((unit) => {
									if (unit.disabled == false) {
										return (
											<option key={unit.unitID} value={unit.unitID}>
												{unit.unitName}
											</option>
										);
									}
								})}
							</select>
							{showRequiredError(error, unitID, "Select Unit")}
						</div>
					</div>
				</div>
				<hr />
				<h1>ITEM DETAILS</h1>

				<div id="add-item-form-details">
					<div className="details-left-container">
						<div className="item-input">
							<div className="item-label-with-buttons">
								<label htmlFor="brandID">
									Brand: <label className="required"> * </label>
								</label>
								<button
									id="select-brand"
									className="item-icon-button item-add-option-button "
									type="button"
									onClick={() => {
										setModStatus(true);
										setModName("Add Brand");
										setModType(brands);
										setModID("itemBrandID");
									}}
								>
									✎
								</button>
							</div>
							<select
								className="sort-dropdown"
								id="user-create-role"
								defaultValue={"0000"}
								name="brand"
								value={details.brand}
								onChange={(e) => handleDetails(e)}
							>
								<option value="" key="00003" defaultValue hidden>
									{" "}
									Select Brand{" "}
								</option>
								{brands.map((brand) => {
									if (brand.disabled == false) {
										return (
											<option key={brand.itemBrandID} value={brand.name}>
												{brand.name}
											</option>
										);
									}
								})}
							</select>
							{showRequiredError(detailsError, details.brand, "Select Brand")}
							{showDuplicateError(
								duplicateError,
								details.brand,
								"is already in use"
							)}
						</div>

						<div className="item-input">
							<label htmlFor="partNumber">
								Part Number:<label className="required"> * </label>
							</label>
							<input
								type="text"
								name="partNumber"
								value={details.partNumber}
								onChange={(e) => handleDetails(e)}
							/>
							{showRequiredError(
								detailsError,
								details.partNumber,
								"Input Part Number"
							)}
						</div>

						<div className="item-input">
							<label htmlFor="quantity">Initial Quantity:</label>
							<input
								type="number"
								name="quantity"
								min="0"
								value={details.quantity}
								onChange={(e) => handleDetails(e)}
							/>
							{showNegativeNumError(
								detailsError,
								details.quantity,
								"Input cannot be negative"
							)}
						</div>
						<button
							type="button"
							className="green-button-container add-button"
							onClick={addDetails}
						>
							Add
						</button>
					</div>

					<div className="details-right-container">
						{JSON.stringify(detailsArray[0]) == "{}" ||
						detailsArray.length == 0 ? (
							<h1 id="gray-header-text">CURRENTLY NO ITEMS TO SHOW</h1>
						) : (
							<>
								<BrandTable
									tableValues={detailsArray}
									convertFunc={convertDetailsArray}
									deleteFunc={deleteRow}
									isEditable={false}
									pageType={false}
								></BrandTable>
								<h3>TOTAL: {quantity}</h3>
							</>
						)}
					</div>
				</div>

				<div className="item-footer">
					<Link href="/items">
						<button className="gray-button-container">Cancel</button>
					</Link>
					<button
						type="button"
						onClick={submitForm}
						className="green-button-container"
					>
						Save
					</button>
				</div>
			</form>
		</>
	);
}

export default ItemCreate;
