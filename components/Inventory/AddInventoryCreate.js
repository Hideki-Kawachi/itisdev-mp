import React, { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import BasicTableAdd from "./InventoryTable";
import BasicTablePull from "./InventoryTablePull";
import BasicButton from "../BasicButton";
import Cancel from "../Pop-up/cancel";
import { v4 as uuid } from 'uuid';

function AddInventoryCreate({unit, brand, supplier}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [vTypeOpen, setvTypeOpen] = useState(false);
  const [otype, setOType] = useState();
  const [name, setName] = useState("");
  const [cancel, setCancel] = useState(false);
  const [acquireDate, setAcquireDate] = useState("");
  const [addRecordID, setAddRecordID] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [itemID, setItemID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitID, setUnitID] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [brandID, setBrandID] = useState("");
  const [partNumber, setpartNumber] = useState("");
  const [supplierID, setSupplierID] = useState("");
  const [remarks, setRemarks] = useState("");
  const [notifResult, setNotifResult] = useState("");
  const [error, setError] = useState(false);
  const [invoiceNumberError, setInvoiceNumberError] = useState("");
  const currentUserID = "00000001";
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0,10);
  const uniqueRecordID = uuid();
  const autoRecordID = uniqueRecordID.slice(0,8)
  const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};
 
	function submitForm() {
    // console.log("1. Error is " + error + ", Data is " + data);
    if (
      acquireDate.length == 0 ||
      addRecordID.length == 0 ||
      invoiceNumber.length == 0 ||
      itemID.length == 0 ||
      quantity.length == 0 ||
      unitID.length == 0 ||
      unitPrice.length == 0 ||
      brandID.length == 0 ||
     // partNumber.length == 0 ||
      supplierID.length == 0 ||
      checkSpecial() == true ||
      checkYear() == true 
    ) {
      setError(true);

    } else {
      let addInvData = {
        acquireDate: acquireDate,
        addRecordID: addRecordID,
        invoiceNumber: invoiceNumber,
        quantity: quantity,
        unitID: unitID,
        unitPrice: unitPrice,
        brandID: brandID,
        supplierID: supplierID,
        creatorID: currentUserID,
        creationDate: new Date(),
        disabled: isDisabled,
      }

    //     console.log("2. Error is " + error + ", Data is " + data);
    }
  }
  function cancelForm(){
    setCancel(true);
  }

  function checkSpecial(){
    const specialChars = `/[!@#$%^&* ()_+\-=\[\]{};':"\\|,.<>\/?]+/;`;
    return specialChars.split("").some((char) => addRecordID.includes(char)); // true if present and false if not
  }

  function showInvoiceNumberError() {

    console.log("Record ID has special chars: " + checkSpecial()); 

    if (error) {
      //Invoice Number is Empty
      if (addRecordID.length == 0) {
        return <span className="vehicle-create-error">Input Invoice Number</span>;
      } else if (checkSpecial()) {
        return (
          <span className="vehicle-create-error">
            Must not contain spaces, letters, or special characters.
          </span>
        );
      }
      //Invoice Number reached max char length
      else if (addRecordID.length > 15 || addRecordID.length < 15) {
        return (
          <span className="vehicle-create-error">
            Record ID must be 15 characters long.
          </span>
        );
      } 
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
  function ShowPriceError(){
    if(error){
      if (unitPrice < 0){
        return (
          <span className="vehicle-create-error">
            Input must not be negative.
          </span>
        )
      }
    }
  }

  function ShowQuantityError(){
    if(error){
      if (quantity < 0){
        return (
          <span className="vehicle-create-error">
            Input must not be negative.
          </span>
        )
      }
    }
  }

  function generateRandomID() {
    var min = 100000000000000;
    var max = 999999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  return (
    <>
      <div className="container">

			<div className="content-tabs">
					<BasicTableAdd> </BasicTableAdd>
					<br />
					<br />

					{/* First Field Row */}

					<div className="form-container">
                    {showResult()}
                    <div className="form-item">
							<label className="form-labels">
								Record ID: {generateRandomID()} {" "}
							</label>{" "}
							<br />
							
						</div>
					</div>				

					<br />
					{/*Second Field Row*/}
					<div className="form-container">

						<div className="form-item">
							<label className="form-labels">Acquired Date: </label> <br />
							<input
								type= "date"
								defaultValue={date}
								className="form-fields"
								placeholder="Acquired Date"
							/>
						</div>

						<div className="form-item">
							<label className="form-labels">
							Invoice Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<label className="label-format">
							{" "}
							Format: Numbers only.{" "}
							</label>{" "}
							<br />
							<input
							type="text"
							className="form-fields"
							placeholder="Enter Invoice Number"
							onChange={(e) => setAddRecordID(e.target.value)}
							/>
							{showInvoiceNumberError()}
							{invoiceNumberError == invoiceNumber && invoiceNumber.length > 0 ? (
							<span className="vehicle-create-error">
								Invoice Number has already been registered.
							</span>
							) : (
							<></>
							)}
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
					<hr />

					{/* Third Field Row */}
					<br />
					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
							Quantity: <label className="required"> * </label>{" "}
							</label>{" "}
							<input
							type="number"
							className="form-fields"
							placeholder="Enter Quantity"
							onChange={(e) => setQuantity(e.target.value)}
							/>
							{ShowQuantityError()}
							{error && quantity.length == 0 ? (
							<span className="vehicle-create-error">
								Input Quantity
							</span>
							) : (
							<></>
							)}
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
							<label className="label-format"> Format: "0000.00" </label> <br />
							<input
							type="number"
							step=".01"
							className="form-fields"
							placeholder="Enter Unit Price"
							onChange={(e) => setUnitPrice(e.target.value)}
							/>
							{ShowPriceError()}
							{error && unitPrice.length == 0 ? (
							<span className="vehicle-create-error">
								Input Unit Price
							</span>
							) : (
							<></>
							)}
						</div>
					</div>

					<br />

					{/* Fourth Field Row */}

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
							<label className="form-labels">Part Number: </label> <br />
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
					<hr />

					{/*Remarks */}

					<div className="form-item">
						<label className="form-labels">Remarks:</label> <br />
						<input type="textarea" className="form-fields-remarks" />
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
			</div>
		</div>
    </>
  );
}

export default AddInventoryCreate;
