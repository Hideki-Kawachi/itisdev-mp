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

    // Item Details
    const [prevBrand, setPrevBrand] = useState([""]);
    // const [details, setDetails] = useState({
    //     brand: "",
    //     partNum: "",
    //     quantity: 0,
    // })
    const [details, setDetails] = useState({
        brand: "",
        partNum: "",
        quantity: 0,
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
        console.log("Submit Form")
    }

    // Handle details input
    function convertDetailsArray () {
        let templateArray = []
        
        detailsArray.every((value) => {
            let template = {
                combiID: "",
                brand: null,
                partNumber: null,
                quantity: 0,
                disabled: false,
            }
            brands.every((brand) => {
                if (value.itemBrandID == brand.itemBrandID) {
                    template.combiID = value.combinationID
                    template.brand = brand.name
                    template.partNumber = value.partNumber
                    template.quantity = value.quantity
                    template.disabled = value.disabled
                    templateArray.push(template)
                    return false;
                }
                return true;
            })
            return true; 
        })

        return templateArray;
        // setDetailsTable(templateArray)
        // if (JSON.stringify(detailsTable[0]) == "{}") {
        //     detailsTable.shift()
        // }
    }

    function enableEdit(e){
        e.preventDefault();
        setIsEditable(true);
    }

    function deleteRow(row) {
        if (detailsArray.length > 1) {
            detailsArray.every((value) => {
                setDetailsArray(detailsArray.filter(value => value.combinationID == row.combiID))
                // if (value.combinationID == row.combiID) {
                //     console.log(detailsArray.filter(value => value == row.combiID))
                // }
                // return true;
            })
        }
        else {
            setDetailsArray([{}]);
        }

        
        console.log(detailsArray)
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
                <button type="button" onClick={(detailsArray) => convertDetailsArray(detailsArray)}>test</button>
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
                    <div className="details-right-container">
                        { JSON.stringify(detailsArray[0]) == "{}" ? (
                            <h1 id="gray-header-text">NO DETAILS TO SHOW</h1>
                        ) : (
                            <BrandTable 
                                detailsArray={detailsArray}
                                setDetailsArray={setDetailsArray}
                                convertFunc={convertDetailsArray} 
                                isEditable={isEditable} 
                                deleteFunc={deleteRow}
                            />
                        )}
                    </div>
                        
                </div>

                { isEditable == true ? (
                    <></>
                ) : (
                    <></>
                )}
{/*                
                <div id="add-item-form-details">
                    <div className="details-left-container" >
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
                            <label htmlFor="partNum">Part Number:</label>
                            <input 
                                type="text"
                                name="partNum"
                                value={details.partNum}
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
    
                        <button type="button" 
                                className="green-button-container add-button"
                                onClick={addDetails} >
                            Add 
                        </button>
                    </div>
    
                    <div className="details-right-container">
                        
                        { Object.keys(detailsTable[0]).length == 0 ? (
                            <h1 id="gray-header-text">CURRENTLY NO ITEMS TO SHOW</h1>
                        ) : (
                            <BrandTable detailsArray={detailsTable} isEdit={true}></BrandTable>
                        )}
                    </div>
                </div> */}
    
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

