import React, { useState } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicTableAdd from "../../components/Inventory/InventoryTable";
import BasicTablePull from "../../components/Inventory/InventoryTablePull";
import BasicButton from "../../components/BasicButton";
import Cancel from "../../components/Pop-up/cancel";

function InventoryCreate({unit, brand, supplier}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [vTypeOpen, setvTypeOpen] = useState(false);
  const [otype, setOType] = useState();
  const [name, setName] = useState("");
  const [cancel, setCancel] = useState(false);
  const [acquireDate, setAcquireDate] = useState("");
  const [addRecordID, setRecordID] = useState("");
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
  const dt = new Date();
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
        return <span className="vehicle-create-error">Input Record ID</span>;
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
            Record ID must be 15 numbers long.
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

  return (
    <>
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

					{/* First Field Row */}

					<div className="form-container">
                    {showResult()}
                    <div className="form-item">
							<label className="form-labels">
								Record ID: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input
								type="text"
								className="form-fields"
								placeholder="Enter Record ID"
							/>
						</div>

						<div className="form-item">
							<label className="form-labels">Acquired Date: </label> <br />
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
                        <label className="label-format">
                        {" "}
                        Format: Numbers only.{" "}
                        </label>{" "}
                        <br />
                        <input
                        type="text"
                        className="form-fields"
                        placeholder="Enter Invoice Number"
                        onChange={(e) => setRecordID(e.target.value)}
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

					{/* Second Field Group */}
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

				</div>

				<div
					className={toggleState === 2 ? "content  active-content" : "content"}
				>
					<BasicTablePull> </BasicTablePull>

					{/* First Field Group */}
					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">Pull-out Date: </label> <br />
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
					<hr />

					<br />

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Item Code: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Item Name: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
								Brand: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>

						<div className="form-item">
							<label className="form-labels">
								Part Number: <label className="required"> * </label>{" "}
							</label>{" "}
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<div className="form-container">
						<div className="form-item">
							<label className="form-labels">
							Quantity: <label className="required"> * </label>{" "}
							</label>{" "}
							<label className="label-format"> Format: "0000.00" </label> <br />
							<input
							type="number"
							className="form-fields"
							placeholder="Enter Quantity"
							onChange={(e) => setQuantity(e.target.value)}
							/>
							{ShowPriceError()}
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
							<br />
							<input type="text" className="form-fields" />
						</div>
					</div>

					<br />
					<button className="gray-button-container1"> Add to Pull Cart</button>
					<hr />
					<br />
					<div className="form-item">
						<label className="form-labels">Remarks:</label> <br />
						<input type="textarea" className="form-fields-remarks" />
					</div>
				</div>
			</div>
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
    </>
  );
}

export default InventoryCreate;
