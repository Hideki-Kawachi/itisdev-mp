import React, { useState } from "react";

import ToggleSwitch from "../ToggleSwitch";

function AddVehicleCategory({ trigger, setTrigger }) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      <div className="item-modal">
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>VEHICLE CATEGORY</h1>
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
          <input type="text" />
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
        >
          Add
        </button>
      </div>
    </>
  );
}

export default AddVehicleCategory;
