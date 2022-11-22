import React, {useState} from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";

function AddInventory() {
  	const [isDisabled, setIsDisabled] = useState(false);
  return (
    <>
      <Header
        page={"INVENTORY"}
        subPage={"ADD RECORD"}
        user={"Example N. Name"}
      ></Header>
      <NavBar></NavBar>
      <br />
      <div id="main-container">

        {/* First Field Group */}
        
        <div className="form-container">
            <div className="form-item">
                <label className="form-labels">
                Acquired Date: {" "}
                </label>{" "}
                <br />
                <input
                type="date"
                className="form-fields"
                placeholder="Acquired Date"
                />
            </div>
        </div>
        <br />
        <hr />
            
            <div className="form-container">

            <div className="form-item">
                <label className="form-labels">
                Invoice Number: <label className="required"> * </label>{" "}
                </label>{" "}
                <br />
                <input
                type="text"
                className="form-fields"
                placeholder="Enter Invoice Number"
                />
            </div>

            <div className="form-item">
                <label className="form-labels">
                Item Name: <label className="required"> * </label>{" "}
                </label>{" "}
                <br />
                <input
                type="text"
                className="form-fields"
                placeholder="Enter Item Name"
                />
            </div>

            <div class="form-item form-toggle">
            {" "}
            Status:{" "}
            <button
              className="item-icon-button item-info-option-button "
              onClick={() => setTrigger(!trigger)}
            >
              {" "}
              i{" "}
            </button>
            <br />
            <ToggleSwitch
              disabled={isDisabled}
              setDisabled={setIsDisabled}
            ></ToggleSwitch>
          </div>

        </div>

        {/* Second Field Group */}
        <br />
        <div className="form-container">

            <div className="form-item">
                <label className="form-labels">
                Quantity: <label className="required"> * </label>{" "}
                </label>{" "}
                <br />
                <input
                type="text"
                className="form-fields"
                placeholder="Enter Quantity"
                />
            </div>

            <div className="form-item">
                <label className="form-labels">
                Unit: <label className="required"> * </label>{" "}
                </label>{" "}
                <button
              className="vehicle-icon-button vehicle-add-option-button "
              onClick={() => setTrigger(!trigger)}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select className="form-fields" />
            </div>

            <div className="form-item">
                <label className="form-labels">
                Unit Price: <label className="required"> * </label>{" "}
                </label>{" "}
                <br />
                <input
                type="text"
                className="form-fields"
                placeholder="Enter Unit Price"
                />
            </div>
        </div>

        <br />
        <hr />
        {/* Third Field Row */}

        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">
              Brand: <label className="required"> * </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              onClick={() => setTrigger(!trigger)}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select className="form-fields" />
          </div>

          <div className="form-item">
            <label className="form-labels">
              Part Number: {" "}
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-fields"
              placeholder="Enter Part Number"
            />
          </div>

          <div className="form-item">
            <label className="form-labels">
              Supplier: <label className="required"> * </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              onClick={() => setTrigger(!trigger)}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select className="form-fields" />
          </div>

        </div>

        <br />
        </div>
        <br />
        <hr />
        <div className="form-container">
            <div className="form-container">
            <span className="form-item-buttons">
                <BasicButton
                label={"Cancel"}
                color={"gray"}
                type={"reset"}
                ></BasicButton>
                <BasicButton
                label={"Save"}
                color={"green"}
                type={"button"}
                ></BasicButton>
            </span>
            </div>
      </div>
    </>
  );
}

export default AddInventory;
