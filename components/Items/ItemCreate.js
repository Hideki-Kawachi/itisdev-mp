import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "react-modal";

import ToggleSwitch from "../ToggleSwitch";
import ItemCatTable from "./CategoryList";
import BrandTable from "./BrandTable";

// TO-DO: add dropdown options as parameters
function ItemCreate({ items, categories, brands }) {
	// Item Identification
	const [itemID, setItemID] = useState("");
	const [categoryID, setCategoryID] = useState("");
	const [name, setName] = useState("");
	const [model, setModel] = useState("");
	const [unitID, setUnitID] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [minQuantity, setMinQuantity] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);

    // Item Details
    const [details, setDetails] = useState({
        combinationID: String(Math.floor(Math.random() * 50000)),
        brand: "",
        partNumber: "",
        quantity: 0,
        unit: "",
        disabled: false,
    })
    const [detailsArray, setDetailsArray] = useState([{}]);

	// Modals
	const [modStatus, setModStatus] = useState(false);
	const [modType, setModType] = useState("");
	const [modName, setModName] = useState("");
	const [modID, setModID] = useState("");

	// Others
	const [error, setError] = useState(false);
	const [notifResult, setNotifResult] = useState("");
	const [infoPop, setInfoPop] = useState(false);
	const [cancel, setCancel] = useState(false);

    function revertBrandToID () {
        detailsArray.every((value) => {
            brands.every((brand) => {
                if (value.brand == brand.name) {
                    value.brand = brand.itemBrandID
                    return false;
                }
                return true;
            }) 
            return true
        })
    }

    // Handle details input
    function handleDetails (e) {
        const { name, value } = e.target
        
        setDetails(prevState => ({
            ...prevState,
            combinationID: String(Math.floor(Math.random() * 50000)),
            [name]: value,
        }));
    }

    function addDetails () {
        if (Object.keys(detailsArray[0]).length == 0) {
            detailsArray.shift()
        }
        setDetailsArray(detailsArray => [...detailsArray, details])
        setQuantity(quantity+parseInt(details.quantity))
        setDetails(prevState => ({
            ...prevState,
            brand: "",
            partNumber: "",
            quantity: 0,
        }));
    }

	function convertDetailsArray (type, arr) {
		if (type) {
			let template = {
				combinationID: "",
				brand: "",
				partNumber: "",
				quantity: 0,
				disabled: false,
			}
			let templateArray = [] 
			arr.every((value) => {
				template.combinationID = value.combinationID;
				template.brand = convertBrandID(value.itemBrandID)
				template.partNumber = value.partNumber;
				template.quantity = value.quantity;
				template.disbaled = value.disabled;
				templateArray.push(template)
				return true; 
			})

			return templateArray;
		}

		return arr;
	}

	function deleteRow(row) {
        if (detailsArray.length > 1) {
            detailsArray.every((value) => {
                setDetailsArray(detailsArray.filter(value => value.combinationID == row.combinationID))
            })
        }
        else {
            setDetailsArray([{}]);
        }
    }
    
    // Submit Form
    function submitForm() {
        // console.log("1. Error is " + error + ", Data is " + data);
        revertBrandToID();
        if (
          itemID.length == 0 ||
          categoryID.length == 0 ||
          name.length == 0 ||
          unitID.length == 0 ||
          quantity == 0 ||
          minQuantity == 0 ||
          detailsArray.length == 0    
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
            disabled: isDisabled,
          }
    
          fetch("/api/items/createItem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({itemData, details:detailsArray}),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data == "created") {
                console.log("SUCCESS");
                setNotifResult("Successfully created!")
                setError(false);
                window.location.reload();
              } else  {
                setError(true);
              }
            });
        }}

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
			<form
				onSubmit={submitForm}
				className="item-column-container"
				id="item-add-main-container"
			>
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
								{categories.map((category) => (
									<option key={category.categoryID} value={category.categoryID}>
										{category.name}
									</option>
								))}
							</select>
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
						</div>

						<div className="item-input" id="item-status">
							<label htmlFor="disabled">Status:</label>
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
								value={minQuantity}
								onChange={(e) => setMinQuantity(e.target.valueAsNumber)}
							/>
						</div>

						<div className="item-input">
							<div className="item-label-with-buttons">
								<label htmlFor="unitID">
									Unit: <label className="required"> * </label>
								</label>
								<button
									className="item-icon-button item-add-option-button "
									type="button"
									onClick={() => {
										setModStatus(true);
										setModName("Select Unit");
										setModType(unitID);
										setModID("unitID");
									}}
								>
									✎
								</button>
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
								<option key="Pieces" value="10001">
									Pieces
								</option>
								<option key="Sets" value="10002">
									Sets
								</option>

								{/* {units.map((unit) => (
                            <option key={unit.unitID} value={unit.unitName}>
                                {unit.unitName}
                            </option>
                        ))} */}
							</select>
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
								{brands.map((brand) => (
									<option key={brand.itemBrandID} value={brand.name}>
										{brand.name}
									</option>
								))}
							</select>
						</div>

						<div className="item-input">
							<label htmlFor="partNumber">Part Number:</label>
							<input
								type="text"
								name="partNumber"
								value={details.partNumber}
								onChange={(e) => handleDetails(e)}
							/>
						</div>

						<div className="item-input">
							<label htmlFor="quantity">Initial Quantity:</label>
							<input
								type="number"
								name="quantity"
								value={details.quantity}
								onChange={(e) => handleDetails(e)}
							/>
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
                    
                    { Object.keys(detailsArray[0]).length == 0 ? (
                        <h1 id="gray-header-text">CURRENTLY NO ITEMS TO SHOW</h1>
                    ) : (
                        <BrandTable 
							tableValues={detailsArray} 
							convertFunc={convertDetailsArray} 
							deleteFunc={deleteRow} 
							isEditable={false} 
							pageType={false}>	
						</BrandTable>
                    )}
                </div>
            </div>

				<div className="item-footer">
					<Link href="/items">
						<button className="gray-button-container">Cancel</button>
					</Link>
					<button type="submit" className="green-button-container">
						Save
					</button>
				</div>
			</form>
		</>
	);
}

export default ItemCreate;
