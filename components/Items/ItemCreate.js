import React, {useState} from 'react'
import Link from "next/link";
import Modal from 'react-modal';

import ToggleSwitch from '../ToggleSwitch'
import TempCategoryFilter from './Temp/TempCategoryFilter'
import ItemCatTable from './CategoryList';

// TO-DO: add dropdown options as parameters
function ItemCreate({categories, brands}) {
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
    const [brandID, setBrandID] = useState("")
    const [partNum, setPartNum] = useState("")
    const [initialQty, setInitialQty] = useState("")
    const [details, setDetails] = useState({
        brand: "",
        partNum: "",
        initialQty: 0,
    })
    const [detailsArray, setDetailsArray] = useState([])

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

    // Submit Form
    function submitForm() {
        // console.log("1. Error is " + error + ", Data is " + data);
        if (
          categoryID.length == 0 ||
          name.length == 0 ||
          brandID.length == 0 ||
          unitID.length == 0 ||
          quantity == 0 ||
          minQuantity == 0 ||
          detailsArray.length == 0    
        ) {
          setError(true);
        } else {
          let itemData = {
            itemID: "6000000000",
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
            body: JSON.stringify(itemData),
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
        <form className="item-column-container" id="item-add-main-container">
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
                        <select className="sort-dropdown" id="user-create-role">
                            {categories.map((category) => (
                                <option key={category.categoryID} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        
                    </div>
                    <div className="item-input">
                        <label htmlFor="itemID">Item Code: <label className="required"> * </label></label>
                        <input 
                            type="text"
                        />
                    </div>
                    <div className="item-input">
                        <label htmlFor="itemName">Item Name: <label className="required"> * </label></label>
                        <input 
                            type="text"
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
                        />
                    </div>

                    <div className="item-input">
                        <label htmlFor="minQuantity">Min. Quantity:</label>
                        <input 
                            type="number"
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
                            defaultValue={"0000"}
                        >

                            <option key="Pieces" value="Pieces">Pieces</option>
                            <option key="Sets" value="Sets">Sets</option>

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
                <div className="details-left-container" >
                    <div className="item-input">
                        <div className="item-label-with-buttons">
                            <label htmlFor="brandID">Brand: <label className="required"> * </label></label>
                            <button id="select-brand" className="item-icon-button item-add-option-button " type="button" onClick={() => {
                                setModStatus(true);
                                setModName("Select Brand");
                                setModType(brandID);
                                setModID("brandID");
                                }}>✎</button>
                        </div>
                        <input 
                            type="text"
                        />
                    </div>

                    <div className="item-input">
                        <label htmlFor="partNum">Part Number:</label>
                        <input 
                            type="text"
                        />
                    </div>

                    <div className="item-input">
                        <label htmlFor="quantity">Initial Quantity:</label>
                        <input 
                            type="number"
                        />
                    </div>

                    <button className="green-button-container add-button">
                        Add 
                    </button>
                </div>

                <div className="details-right-container">
                    { detailsArray.length == 0 ? (
                        <h1 id="gray-header-text">CURRENTLY NO ITEMS TO SHOW</h1>
                    ) : (
                        <h1>Insert table here</h1>
                    )}
                </div>
            </div>

            <div className="item-footer">
                <Link href="/items">
                    <button className="gray-button-container">Cancel</button>
                </Link>
                
                <Link href="/items">
                    <button className="green-button-container">Save</button>
                </Link>
                
            </div>
        </form>
    </>
  )
}


export default ItemCreate;