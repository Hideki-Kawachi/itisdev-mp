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

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }

function ItemEdit({itemID, items, categories, brands}) {
    // Item Identification
    const [categoryID, setCategoryID] = useState("");
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [unitID, setUnitID] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [minQuantity, setMinQuantity] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);

    const [detailsButton, setDetailsButton] = useState("Add");

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

    // Modals
    const [modStatus, setModStatus] = useState(false)
    const [modType, setModType] = useState("")
    const [modName, setModName] = useState("")
    const [modID, setModID] = useState("")

    // Others
    const [error, setError] = useState(false);
    const [notifResult, setNotifResult] = useState("");
    const [infoPop, setInfoPop] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

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
        })
    }, [itemID])


    function submitForm(e) {
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
      
            fetch("/api/items/updateItem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({itemData, details:detailsArray}),
            })
            .then((res) => res.json())
            .then((data) => {
                setNotifResult(data);
                if (data != "No Fields Edited") {
                    setTimeout(() => window.location.reload(), 800);
                }
            });
    }}
    
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

    // Handle details input
    function convertDetailsArray () {
        let templateArray = []
        
        detailsArray.every((value) => {
            let template = {
                combiID: "",
                brand: null,
                partNumber: null,
                quantity: null,
                disabled: false,
                unit: "",
            }
            brands.every((brand) => {
                if (value.itemBrandID == brand.itemBrandID) {
                    template.combiID = value.combinationID
                    template.brand = brand.name
                    template.partNumber = value.partNumber
                    template.quantity = value.quantity
                    template.disabled = value.disabled
                    template.unit = value.unit
                    templateArray.push(template)
                    return false;
                }
                return true;
            })
            return true; 
        })
        
        return templateArray;
    }

    // Handle details input
    function handleDetails (e) {
        const { name, value } = e.target
        setDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    function addDetails () {
        if (Object.keys(detailsArray[0]).length == 0) {
            detailsArray.shift()
        }
        setDetailsArray(detailsArray => [...detailsArray, details])
        setQuantity(quantity+parseInt(details.quantity))
        clearDetails()
    }

    function enableEdit(e){
        e.preventDefault();
        setIsEditable(true);
    }
    
    function onRowEditClick(row) {
        setDetails(prevState => ({
            ...prevState,
            combinationID: row.combiID,
            brand: row.brand,
            partNumber: row.partNumber,
            quantity: row.quantity,
            unit: row.unit,
            disabled: row.disabled,
        }));
        setDetailsButton("Edit")
    }

    function editRow() {
        let newQuantity = 0;
        let newArr = detailsArray.map(item => {
            if (item.combinationID == details.combinationID){
                item.itemBrandID = revertOneBrandToID(details.brand);
                item.partNumber = details.partNumber;
                item.quantity = details.quantity;
                item.unit = details.unit;
                item.disabled = details.disabled;
                newQuantity += item.quantity;
            }
            return item;
        })
        setDetailsButton("Add")
        setQuantity(newQuantity)
        setDetailsArray(newArr)
        clearDetails()
    }

    function deleteRow(row) {
        if (detailsArray.length > 1) {
            detailsArray.every((value) => {
                setDetailsArray(detailsArray.filter(value => value.combinationID == row.combiID))
            })
        }
        else {
            setDetailsArray([{}]);
        }
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
            <form onSubmit={submitForm} className="item-column-container" id="item-add-main-container">
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
                                {categories.map((category) => (
                                    <option key={category.categoryID} value={category.categoryID}>
                                        {category.name}
                                    </option>
                                ))}
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
                                <option key="Pieces" value="10001">Pieces</option>
                                <option key="Sets" value="10002">Sets</option>
    
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
                            {brands.map((brand) => (
                                <option key={brand.itemBrandID} value={brand.name}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="item-input">
                        <label htmlFor="partNum">Part Number:</label>
                        <input 
                            type="text"
                            name="partNumber"
                            value={details.partNumber}
                            onChange={(e) => {handleDetails(e)}}
                        />
                    </div>

                    <div className="item-input">
                        <label htmlFor="quantity">Initial Quantity:</label>
                        <input 
                            type="number"
                            name="quantity"
                            value={details.quantity}
                            onChange={(e) => {handleDetails(e)}}
                        />
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
                            <BrandTable 
                                detailsArray={convertDetailsArray()}
                                setDetailsArray={setDetailsArray} 
                                isEditable={isEditable} 
                                deleteFunc={deleteRow}
                                editFunc={onRowEditClick}
                                detailsButton={detailsButton}
                                setDetailsButton={setDetailsButton}
                            />
                        )}
                    </div>
                        
                </div>

    
                <div className="item-footer">
                    <Link href="/items">
                        <button className="gray-button-container">Cancel</button>
                    </Link> 
                    { isEditable ? (
                        <button 
                            type="submit" 
                            className="green-button-container"
                        >Save
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className="green-button-container" 
                            onClick={(e) => enableEdit(e)
                            }
                        >Edit ✎
                        </button>
                    )}
                    
                </div>
            </form>
        </>
      )
    }


export default ItemEdit;

