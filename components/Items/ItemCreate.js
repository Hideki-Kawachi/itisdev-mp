import React, {useState} from 'react'

import ToggleSwitch from '../ToggleSwitch'
import TempCategoryFilter from './Temp/TempCategoryFilter'

function ItemCreate() {
    const [isDisabled, setIsDisabled] = useState(false);
  return (
    <>
        <form className="item-add-main-container">
            <h1>IDENTIFICATION</h1>

            <div id="add-item-form-identification">
                <div className="form-container">
                    <div className="item-input">
                        <label htmlFor="categoryID">Item Category: <label className="required"> * </label></label>
                        <TempCategoryFilter identifier="item-add-category-dropdown"></TempCategoryFilter>
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
                        <label htmlFor="unitID">Unit:<label className="required"> * </label></label>
                        <select
                            className="sort-dropdown"
                            id="user-create-role"
                            defaultValue={"0000"}
                        >

                            <option key="Pieces" value="Pieces">Pieces</option>
                            <option key="Sets" value="Sets">Pieces</option>

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
                        <label htmlFor="itemBrand">Brand:</label>
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
            </div>
        </form>


    </>
  )
}

export default ItemCreate