import React, { useEffect, useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import BasicTableAdd from "./InventoryTable";
import BasicTablePull from "./InventoryTablePull";
import PullTable from "./PullCartTable";
import BasicButton from "../BasicButton";
import Cancel from "../Pop-up/cancel";

function PullInventoryCreate({
	currentUser,
	unitData,
	brandData,
	supplierData,
	vehicleData,
	itemData,
	itemBrandData,
	pullData,
	pullTableData,
}) {
	const curr = new Date();
	curr.setDate(curr.getDate());
	const date = curr.toISOString().substring(0, 10);

	const [vTypeOpen, setvTypeOpen] = useState(false);
	const [otype, setOType] = useState();
	const [name, setName] = useState("");
	const [cancel, setCancel] = useState(false);
	const [pullDate, setPullDate] = useState(date);
	const [JOnumber, setJOnumber] = useState("");
	const [itemID, setItemID] = useState("");
	const [plateNum, setPlateNum] = useState("");
	const [mechanicName, setMechanicName] = useState("");
	const [remarks, setRemarks] = useState("");
	const [notifResult, setNotifResult] = useState("");
	const [error, setError] = useState(false);
	const [JOnumberError, setJOnumberError] = useState("");
	const [itemIDErorr, setItemIDError] = useState("");
	const [plateNumError, setPlateNumError] = useState("");

	const [brands, setBrands] = useState([{}]);
	const [partNumbers, setPartNumbers] = useState([{}]);
	const [maxQuantity, setMaxQuantity] = useState(0);

	const [toggleState, setToggleState] = useState(1);
	const [quantity, setQuantity] = useState(0);

	// Pull-out Cart Details
	const [details, setDetails] = useState({
		itemCode: "",
		itemName: "",
		brand: "",
		partNum: "",
		quantity: 0,
		unit: "",
	});

	const [detailsArray, setDetailsArray] = useState([{}]);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	function handleDetails(e) {
		const { name, value } = e.target;
		console.log("NAME IS:", name, "  VALUE IS:", value);
		setDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
		if (name == "itemCode") {
			//if input is item code
			let isFound = false;
			let index = itemData.length - 1;
			while (!isFound && index >= 0) {
				if (itemData[index].itemID == value) {
					let tempItem = itemData[index];
					let unitName = "";
					let unitID = "";

					let isFound2 = false;
					let index2 = unitData.length - 1;
					while (!isFound2 && index2 >= 0) {
						if (unitData[index2].unitID == itemData[index].unitID) {
							unitName = unitData[index2].unitName;
							unitID = itemData[index].unitID;
							isFound2 = true;
						}
						index2--;
					}
					setMaxQuantity(itemData[index].quantity);
					setDetails((prevState) => ({
						...prevState,
						itemName: tempItem.itemName,
						unit: unitName,
						unitID: unitID,
					}));
					isFound = true;
					brandList(itemData[index].itemID);
				}
				index--;
			}
			if (!isFound) {
				setDetails((prevState) => ({
					...prevState,
					itemName: "",
					unit: "",
					unitID: "",
				}));
			}
		} else if (name == "itemName") {
			//if input is item name
			let isFound = false;
			let index = itemData.length - 1;
			while (!isFound && index >= 0) {
				console.log("ITEM IS:", itemData[index].itemName, "  value is:", value);
				if (itemData[index].itemName == value) {
					let tempItem = itemData[index];

					let unitName = "";
					let unitID = "";
					console.log("item data is:", itemData[index]);

					let isFound2 = false;
					let index2 = unitData.length - 1;
					while (!isFound2 && index2 >= 0) {
						if (unitData[index2].unitID == itemData[index].unitID) {
							unitName = unitData[index2].unitName;
							unitID = itemData[index].unitID;
							isFound2 = true;
						}
						index2--;
					}
					setMaxQuantity(itemData[index].quantity);
					setDetails((prevState) => ({
						...prevState,
						itemCode: tempItem.itemID,
						unit: unitName,
						unitID: unitID,
					}));
					isFound = true;
					brandList(itemData[index].itemID);
				}
				index--;
			}
			if (!isFound) {
				setDetails((prevState) => ({
					...prevState,
					itemCode: "",
					unit: "",
					unitID: "",
				}));
			}
		}
	}

	function brandList(itemID) {
		let tempBrandList = [];

		itemBrandData.forEach((itemBrand) => {
			if (itemBrand.itemID == itemID) {
				let isFound = false;
				let index = brandData.length - 1;
				let name = "";
				let part = "";
				while (!isFound && index >= 0) {
					if (itemBrand.itemBrandID == brandData[index].itemBrandID) {
						name = brandData[index].name;
						part = itemBrand.partNumber;
						isFound = true;
					}
					index--;
				}
				let tempItemBrand = {
					brandID: itemBrand.itemBrandID,
					brandName: name,
					partNum: part,
				};
				tempBrandList.push(tempItemBrand);
			}
		});
		setDetails((prevState) => ({
			...prevState,
			brand: tempBrandList[0]?.brandID,
			partNum: tempBrandList[0]?.partNum,
		}));
		setBrands(tempBrandList);
	}

	useEffect(() => {
		console.log("currentUser", currentUser);
		console.log("unitData", unitData);
		console.log("brandData", brandData);
		console.log("supplierData", supplierData);
		console.log("vehicleData", vehicleData);
		console.log("itemData", itemData);
		console.log("itemBrandData", itemBrandData);
	}, []);

	useEffect(() => {
		console.log("DETAILS ARE:", details);
	}, [details]);

	function submitForm() {
		if (
			pullDate.length == 0 ||
			JOnumber.length != 15 ||
			plateNum.length == 0 ||
			plateNum.length > 8 ||
			mechanicName.length == 0 ||
			JSON.stringify(detailsArray[0]) == "{}"
		) {
			setError(true);
		} else {
			let tempID = "";
			if (pullData.length == 0) {
				tempID = "100000000000000";
			} else {
				let id = Math.max(...pullData.map((pull) => pull.lessRecordID)) + 1;
				tempID = id.toString();
			}

			let pullInvData = {
				lessRecordID: tempID,
				pullDate: new Date(pullDate),
				JOnumber: JOnumber,
				plateNum: plateNum,
				mechanicName: mechanicName,
				remarks: remarks,
				creatorID: currentUser.userID,
				creationDate: new Date(),
				editorID: null,
				editDate: null,
				disabled: false,
			};

			fetch("/api/inventory/pullInventory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ pullInvData, detailsArray }),
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

	function addToCart() {
		if (
			details.itemCode.length == 0 ||
			details.itemName.length == 0 ||
			details.brand.length == 0 ||
			details.partNum.length == 0 ||
			details.quantity == 0
		) {
			setError(true);
		} else {
			if (Object.keys(detailsArray[0]).length == 0) {
				detailsArray.shift();
			}
			setDetailsArray((detailsArray) => [...detailsArray, details]);
			setQuantity(quantity + parseInt(details.quantity));
			setDetails((prevState) => ({
				...prevState,
				itemCode: "",
				itemName: "",
				brand: "",
				partNum: "",
				quantity: 0,
				unit: "",
			}));
		}
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
		//Item ID Number is Empty
		if (details.itemCode.length == 0) {
			return <span className="vehicle-create-error">Input Item Code</span>;
		}
		//Item ID Number reached max char length
		else if (details.itemCode.length > 10) {
			return (
				<span className="vehicle-create-error">Item Code is Too Long.</span>
			);
		} else if (details.itemName.length == 0) {
			return (
				<span className="vehicle-create-error">Item Code is Not Found</span>
			);
		}
	}

	function showItemNameError() {
		if (details.itemName.length == 0) {
			return <span className="vehicle-create-error">Input Item Name</span>;
		} else if (details.itemCode.length == 0) {
			return (
				<span className="vehicle-create-error">Item Name is Not Found</span>
			);
		}
	}

	function showQuantityError() {
		if (details.quantity == 0) {
			return (
				<span className="vehicle-create-error">Quantity Cannot Be Zero</span>
			);
		} else if (details.quantity > maxQuantity) {
			return (
				<span className="vehicle-create-error">Quantity Exceeds Stock</span>
			);
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

	function disableFields() {
		return !!(details.itemName.length == 0 || details.itemCode.length == 0);
	}

	function showButton() {
		if (
			details.itemCode.length == 0 ||
			details.itemName.length == 0 ||
			details.brand.length == 0 ||
			details.partNum.length == 0 ||
			details.quantity == 0 ||
			details.unit.length == 0 ||
			details.quantity > maxQuantity
		) {
			return (
				<button className="gray-button-container1" disabled>
					{" "}
					Add to Pull Cart
				</button>
			);
		} else {
			return (
				<button className="green-button-container1" onClick={addToCart}>
					{" "}
					Add to Pull Cart
				</button>
			);
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
					<BasicTablePull pullTableData={pullTableData}> </BasicTablePull>

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
					{/* PULL OUT DETAILS */}

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
								name="itemCode"
								value={details.itemCode.toUpperCase()}
								onChange={(e) => handleDetails(e)}
							/>
							{showItemIDError()}
						</div>

						<div className="form-item">
							<label className="form-labels">
								Item Name: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input
								type="text"
								className="form-fields"
								name="itemName"
								value={details.itemName}
								onChange={(e) => handleDetails(e)}
							/>
							{showItemNameError()}
						</div>
					</div>
					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Brand: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<select
								className="form-fields"
								name="brand"
								value={details.brand}
								onChange={(e) => handleDetails(e)}
								disabled={disableFields()}
							>
								{brands.map((brand, index) => (
									<option key={index} value={brand.brandID}>
										{brand.brandName}
									</option>
								))}
							</select>
						</div>

						<div className="form-item">
							<label className="form-labels">
								Part Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<select
								className="form-fields"
								name="partNum"
								value={details.partNum}
								onChange={(e) => handleDetails(e)}
								disabled={disableFields()}
							>
								{brands.map((brand, index) => (
									<option key={index} value={brand.partNum}>
										{brand.partNum}
									</option>
								))}
							</select>
						</div>
					</div>
					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Quantity: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input
								type="number"
								className="form-fields"
								name="quantity"
								value={details.quantity}
								onChange={(e) => handleDetails(e)}
								disabled={disableFields()}
							/>
							{showQuantityError()}
						</div>

						<div className="form-item">
							<label className="form-labels">
								Unit: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<select
								className="form-fields"
								name="unit"
								value={details.unit}
								onChange={(e) => handleDetails(e)}
								disabled={disableFields()}
							>
								<option key={details.unit} value={details.unit}>
									{details.unit}
								</option>
							</select>
						</div>
					</div>
					<br />
					{showButton()}
					<div className="details-right-container">
						{Object.keys(detailsArray[0]).length == 0 ? (
							<h1 id="gray-header-text">CURRENTLY NO ITEMS TO SHOW</h1>
						) : (
							<PullTable detailsArray={detailsArray} isEdit={true}></PullTable>
						)}
					</div>
					<br />
					<br />
					<hr />
					<br />

					<div className="form-item">
						<label className="form-labels">Remarks:</label> <br />
						<input
							type="textarea"
							className="form-fields-remarks"
							onChange={(e) => setRemarks(e.target.value)}
						/>
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
