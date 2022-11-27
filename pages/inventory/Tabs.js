import {useState} from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import BasicTableAdd from "../../components/Inventory/InventoryTable";
import BasicTablePull from "../../components/Inventory/InventoryTablePull";

function Tabs() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          ADD 
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          PULL-OUT
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <BasicTableAdd> </BasicTableAdd>
          <br />
          <br />

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

          <div className="form-item form-toggle">
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

        { /*Remarks */}

        <div className="form-item">
            <label className="form-labels">
            Remarks: 
            </label>{" "}
            <br />
            <input
            type="textarea"
            className="form-fields"
            />
          </div>

        {/* Button */}
        <div className="item-footer">      
          <button className="gray-button-container">Cancel</button>
          <button className="green-button-container">Save</button>     
        </div>

      </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >

          <BasicTablePull> </BasicTablePull>
          
            {/* First Field Group */}

            <div className="form-container">
              <div className="form-item">
                  <label className="form-labels">
                  Pull-out Date: {" "}
                  </label>{" "}
                  <br />
                  <input
                  type="date"
                  className="form-fields"
                  placeholder="Acquired Date"
                  />
              </div>

              <div className="form-item">
                <label className="form-labels">
                Job Order Number: <label className="required"> * </label>{" "}
                </label>{" "}
                <br />
                <input
                type="text"
                className="form-fields"
                placeholder="Enter Job Order Number"
                />
              </div>

              <div className="form-item">
                <label className="form-labels">
                Plate Number: <label className="required"> * </label>{" "}
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
                Mechanic Name: <label className="required"> * </label>{" "}
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

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
          Item Code: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
          type="text"
          className="form-fields"
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
          />
        </div>

      </div>

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
          Brand: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
          type="text"
          className="form-fields"
          />
        </div>

        <div className="form-item">
          <label className="form-labels">
          Part Number: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
          type="text"
          className="form-fields"
          />
        </div>
      </div>

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
          Quantity: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
          type="text"
          className="form-fields"
          />
        </div>

        <div className="form-item">
          <label className="form-labels">
          Unit: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
          type="text"
          className="form-fields"
          />
        </div>
      </div>

        {/* Buttons */}
          <div className="item-footer">      
            <button className="gray-button-container">Cancel</button>
            <button className="green-button-container">Save</button>     
          </div>

        </div>

      </div>
    </div>
  );
}
export default Tabs;
