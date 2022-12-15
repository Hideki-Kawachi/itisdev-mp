import React, { useState, useEffect, useMemo } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";
import LockedToggle from "../../components/LockedToggle";
import BasicButton from "../../components/BasicButton";
import ItemCatTable from "./CategoryList";
import Modal from "react-modal";
import Cancel from "../../components/Pop-up/cancel";
import Info from "../../components/Pop-up/info";
import { useRouter } from "next/router";
import Link from "next/link";
import BrandTable from "./BrandTable";
// tempID = "100000000000000"

function ItemEdit({ userID, itemID, items, categories, brands, units}) {
    // Item Identification
    const [categoryID, setCategoryID] = useState("");
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [unitID, setUnitID] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [minQuantity, setMinQuantity] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const [detailsButton, setDetailsButton] = useState("Add");

    const curr = new Date();
	curr.setDate(curr.getDate());
	const date = curr.toISOString().substring(0, 10);

    // Item Details
    const [details, setDetails] = useState({
        combinationID: "",
        brand: "",
        partNumber: "",
        quantity: 0,
        unit: "",
        disabled: false,
    })
    const [detailsArray, setDetailsArray] = useState([{}]);
    const [auditTrail, setAuditTrail] = useState({
        auditID: String(Math.floor(Math.random() * 90000)),
        itemID: "",
        auditDate: "",
        systemCount: 0,
        physicalCount: 0,
        creatorID: "",
        creationDate: "",
    });
    const [auditArray, setAuditArray] = useState([{}])
    const [newCombiID, setCombiID] = useState(String(Math.floor(Math.random() * 50000)));
    
    // Modals
    const [modStatus, setModStatus] = useState(false)
    const [modType, setModType] = useState("")
    const [modName, setModName] = useState("")
    const [modID, setModID] = useState("")

    // Errors
    const [error, setError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
	const [duplicateError, setDuplicateError] = useState(false);

    // Others
    
    const [notifResult, setNotifResult] = useState("");
    const [infoPop, setInfoPop] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const currentUserID = "00000001";

    useEffect(() => {
        fetch("/api/items/" + itemID, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            setCategoryID(data.itemInfo.categoryID);
            setName(data.itemInfo.itemName);
            setModel(data.itemInfo.itemModel);
            setUnitID(data.itemInfo.unitID);
            setQuantity(data.itemInfo.quantity);
            setMinQuantity(data.itemInfo.minQuantity);
            setIsDisabled(data.itemInfo.disabled);
            setDetailsArray(data.brandInfo);

            auditTrail["systemCount"] = parseInt(data.itemInfo.quantity);
            auditTrail["itemID"] = itemID; 
            auditTrail["creatorID"] = userID;
            auditTrail["auditDate"] = curr.toISOString();
            auditTrail["creationDate"] = curr.toISOString();
        })
    }, [itemID])


    function submitForm(e) {
        // EDIT ITEM
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
              disabled: isDisabled,
            }

            console.log(JSON.stringify(auditTrail))

            fetch("/api/items/updateItem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({itemData, details:detailsArray}),
            })
            .then((res) => res.json())

            // AUDIT
            auditTrail["physicalCount"] = quantity;
            fetch("/api/items/auditTrail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(auditTrail),
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
            
    }}

    function checkPhysicalCount() {
        auditTrail["physicalCount"] = quantity;
        console.log(auditTrail.physicalCount)
    }
    function checkAudit(){
        console.log("Audit " + JSON.stringify(auditTrail));
    }
    // Handle details input
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
                template.disabled = value.disabled;
                templateArray.push(template)

                template = {
                    combinationID: "",
                    brand: "",
                    partNumber: "",
                    quantity: 0,
                    disabled: false,
                }
                return true; 
            })
            
            return templateArray;
        }
        return arr;
    }

    function convertBrandID (value) {
        brands.every((brand) => {
            if (value == brand.itemBrandID) {
                value = brand.name
                return false;
            }
            return true;
        }) 

        return value;
    }
    function revertOneBrandToID (value) {
        brands.every((brand) => {
            if (value == brand.name) {
                value = brand.itemBrandID
                return false;
            }
            return true;
        }) 

        return value;
    }

    // Handle details input
    function handleDetails (e) {
        const { name, value } = e.target
        setDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (name == "brand") {
			setDuplicateError(false)
		}
        if (name == "quantity") {

        }
    }

    function checkDetails() {
		return details.brand.length == 0 || details.partNumber.length == 0 || parseInt(details.quantity) < 0
	}

    function createFilterArray() {
        let filterArray = detailsArray.filter(value => value.combinationID != details.combinationID)
        return filterArray;
    }

    function checkDuplicate() {
		let duplicate = false;
        let filterArray = createFilterArray()
        
		filterArray.every((value) => {
			if (value.itemBrandID == revertOneBrandToID(details.brand)) {
				duplicate = true;
				return false;
			}
			return true;
		})
		return duplicate;
	}

    function addDetails () {
        if (Object.keys(detailsArray[0]).length == 0) {
            detailsArray.shift()
            auditTrail.shift()
        }
        details["combinationID"] = String(Math.floor(Math.random() * 50000)),
        details["itemBrandID"] = revertOneBrandToID(details["brand"]);

        setDetailsError(checkDetails())
        setDuplicateError(checkDuplicate())
        if (!checkDetails() && !checkDuplicate()) {
            setDetailsArray(detailsArray => [...detailsArray, details])
            setQuantity(quantity+parseInt(details.quantity))    
            clearDetails()
        }
    }

    function clearDetails() {
        setDetails(prevState => ({
            ...prevState,
            combinationID: "",
            brand: "",
            partNumber: "",
            quantity: 0,
            unit: "",
            disabled: false,
        }))
    }

    function enableEdit(e){
        e.preventDefault();
        setIsEditable(true);
    }
    
    function onRowEditClick(row) {
        setDetails(prevState => ({
            ...prevState,
            combinationID: row.combinationID,
            brand: row.brand,
            partNumber: row.partNumber,
            quantity: row.quantity,
            // unit: row.unit,
            disabled: row.disabled,
        }));
        setDetailsButton("Edit")
    }

    function editRow() {
        let newQuantity = quantity;
        setDuplicateError(checkDuplicate())
        if(!checkDuplicate()) {
            let newArr = detailsArray.map(item => {
                if (item.combinationID == details.combinationID){
                    newQuantity -= parseInt(item.quantity);
                    newQuantity += parseInt(details.quantity);
                    item.combinationID == details.combinationID
                    item.itemBrandID = revertOneBrandToID(details.brand);
                    item.partNumber = details.partNumber;
                    item.quantity = details.quantity;
                    // item.unit = details.unit;
                    item.disabled = details.disabled;
                }
                return item;
            }) 
            setDetailsButton("Add")
            setDetailsArray(newArr)
            setQuantity(newQuantity)
            clearDetails()
        }  
    }

    function deleteRow(row) {
        setQuantity(quantity-parseInt(row.quantity))
        if (detailsArray.length > 1) {
            detailsArray.every((value) => {
                value.disabled = true;
                setDetailsArray(detailsArray.filter(value => value.combinationID != row.combinationID))
            })
        }
        else {
            setDetailsArray([{}]);
        }
    }

    function showRequiredError(errType, field, msg) {
		if (errType && field.length == 0) {
			return (<span className="vehicle-create-error">{msg}</span>)
		}
	}
	
	function showNegativeNumError(errType, field, msg) {
		if (errType && field < 0) {
			return (<span className="vehicle-create-error">{msg}</span>)
		}
	}

    function showDuplicateError(errType, field, msg) {
		if (errType) {
			return (<span className="vehicle-create-error">{field + " " + msg}</span>)
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
            <Modal isOpen={cancel} className="modal" ariaHideApp={false}>
                <Cancel
                trigger={cancel}
                setTrigger={setCancel}
                transaction={"Editing of Item"}
                ></Cancel>
            </Modal>
            <form className="item-column-container" id="item-add-main-container">
                <button type="button" onClick={checkAudit}>Test</button>
                <h1>IDENTIFICATION</h1>
    
                <div id="add-item-form-identification">
                    <div className="form-container">
                        <div className="item-input">
                            <div className="item-label-with-buttons">
                                <label htmlFor="categoryID">Item Category: <label className="required"> * </label></label>
                                <button className="item-icon-button item-add-option-button " type="button" onClick={() => {
                                    setModStatus(true);
                                    setModName("Select Category");
                                    setModType(categories);
                                    setModID("categoryID");
                                    }}>✎</button>
                            </div>
                            <select 
                                className="sort-dropdown" 
                                id="user-create-role" 
                                value={categoryID}
                                disabled={!isEditable}
                                onChange={(e) => setCategoryID(e.target.value)}
                            >
                            {categories.map((category) => {
                                if (category.disabled == false) {
                                    return (
                                        <option key={category.categoryID} value={category.categoryID}>
                                            {category.name}
                                        </option>
                                    )}
                                })
                            }
                            </select>
                            
                        </div>
                        <div className="item-input">
                            <label htmlFor="itemID">Item Code: <label className="required"> * </label></label>
                            <input 
                                type="text"
                                name="itemID"
                                value={itemID}
                                onChange={(e) => setItemID(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="item-input">
                            <label htmlFor="itemName">Item Name: <label className="required"> * </label></label>
                            <input 
                                type="text"
                                name="itemName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditable}
                            />
                            {showRequiredError(error, name, "Input Item Name")}
                        </div>
    
                        <div className="item-input" id="item-status">
                            <label htmlFor="disabled">Status:</label>
                            { isEditable == false ? (
                                <LockedToggle
                                    disabled={isDisabled}
                                    setDisabled={setIsDisabled}
                                ></LockedToggle> 
                            ) : (
                                <ToggleSwitch
                                    disabled={isDisabled}
                                    setDisabled={setIsDisabled}
                                ></ToggleSwitch>
                            )}
                        </div>
                    </div>
    
                    <div className="form-container">
                        <div className="item-input">
                            <label htmlFor="itemModel">Item Model:</label>
                            <input 
                                type="text"
                                name="itemModel"
                                value={model}
                                disabled={!isEditable}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>
    
                        <div className="item-input">
                            <label htmlFor="minQuantity">Min. Quantity:</label>
                            <input 
                                type="number"
                                name="minQuantity"
                                value={minQuantity}
                                disabled={!isEditable}
                                onChange={(e) => setMinQuantity(e.target.valueAsNumber)}
                            />
                            {showNegativeNumError(error, minQuantity, "Input cannot be negative")}
                        </div>
    
                        <div className="item-input">
                            <div className="item-label-with-buttons">
                                <label htmlFor="unitID">Unit: <label className="required"> * </label></label>
                                <button className="item-icon-button item-add-option-button " type="button" onClick={() => {
                                    setModStatus(true);
                                    setModName("Select Unit");
                                    setModType(unitID);
                                    setModID("unitID");
                                    }}>✎</button>
                            </div>
                            {/* Insert Modal Here */}
                            <select
                                className="sort-dropdown"
                                id="user-create-role"
                                value={unitID}
                                disabled={!isEditable}
                                onChange={(e) => setUnitID(e.target.value)}
                            >
                            {units.map((unit) => {
                                if (unit.disabled == false) {
                                    return (
                                        <option key={unit.unitID} value={unit.unitID}>
                                            {unit.unitName}
                                        </option>
                                    )
                                }
                            }
                            )}
                            </select>
                            {showRequiredError(error, unitID, "Select Unit")}
                        </div>
                    </div>
                </div>
                <hr />
                <h1>ITEM DETAILS</h1>

                <div id="add-item-form-details">
                { isEditable == true ? (
                    <><div className="details-left-container" >
                    <div className="item-input">
                        <div className="item-label-with-buttons">
                            <label htmlFor="brandID">Brand: <label className="required"> * </label></label>
                            <button id="select-brand" className="item-icon-button item-add-option-button " type="button" onClick={() => {
                                setModStatus(true);
                                setModName("Add Brand");
                                setModType(brands);
                                setModID("itemBrandID");
                                }}>✎</button>
                        </div>
                        <select
                            className="sort-dropdown"
                            id="user-create-role"
                            defaultValue={"0000"}
                            name="brand"
                            value={details.brand}
                            onChange={(e) => {handleDetails(e)}}
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
                                    )}
                                })
                            }
                        </select>
                        {showRequiredError(detailsError, details.brand, "Select Brand")}
                        {showDuplicateError(duplicateError, details.brand, "is already in use")}
                    </div>

                    <div className="item-input">
                        <label htmlFor="partNum">Part Number:</label>
                        <input 
                            type="text"
                            name="partNumber"
                            value={details.partNumber}
                            onChange={(e) => {handleDetails(e)}}
                        />
                        {showRequiredError(detailsError, details.partNumber, "Input Part Number")}
                    </div>

                    <div className="item-input">
                        <label htmlFor="quantity">New Quantity:</label>
                        <input 
                            type="number"
                            name="quantity"
                            value={details.quantity}
                            onChange={(e) => {handleDetails(e)}}
                        />
                        {showNegativeNumError(detailsError, details.quantity, "Input cannot be negative")}
                    </div>
                    
                    { detailsButton == "Edit" ? 
                    ( 
                    <>
                        <button 
                            type="button" 
                            className="green-button-container add-button"
                            onClick={() => editRow()}
                        >Edit 
                        </button>
                    </>
                    ) : 
                    (
                        <button 
                            type="button" 
                            className="green-button-container add-button"
                            onClick={() => addDetails()}
                        >Add 
                        </button>
                    )
 
                    }
                   
                </div></>
                ) : (
                    <></>
                )}
                    <div className="details-right-container">
                        { JSON.stringify(detailsArray[0]) == "{}" ? (
                            <h1 id="gray-header-text">NO DETAILS TO SHOW</h1>
                        ) : (
                            <>
                                <BrandTable
                                    tableValues={detailsArray} 
                                    convertFunc={convertDetailsArray}
                                    isEditable={isEditable} 
                                    deleteFunc={deleteRow}
                                    editFunc={onRowEditClick}
                                    pageType={true}
                                />
                                <h3>TOTAL: {quantity}</h3>
                            </>
                        )}
                    </div>
                        
                </div>

    
                <div className="item-footer">
                    <Link href="/items">
                        <button className="gray-button-container">Cancel</button>
                    </Link> 
                    { isEditable ? (
                        <button 
                            type="button" 
                            className="green-button-container"
                            onClick={submitForm}
                        >Save
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className="green-button-container" 
                            onClick={(e) => enableEdit(e)}
                        >Edit ✎
                        </button>
                    )}
                    
                </div>
            </form>
        </>
      )
    }


export default ItemEdit;

