import React, { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import TableInventoryAdd from "./InventoryTable";
import TableInventoryPull from "./InventoryTablePull";
import BasicButton from "../../components/BasicButton";
import Cancel from "../Pop-up/cancel";
import { v4 as uuid } from 'uuid';
import Modal from 'react-modal';
import ItemCatTable from "../Inventory/InvCategoryList";
import days from "dayjs";
import { INVSUPP_COLUMNS } from "./InvSupplierColumns";
import { INVBRAND_COLUMNS } from "./InvBrandColumns";

function AddInventoryCreate({ inventories, units, brands, items, suppliers }) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [name, setName] = useState("");
	const [cancel, setCancel] = useState(false);
	const [acquireDate, setAcquireDate] = useState(new Date());
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
	const [partNumberError, setPartNumberError] = useState("");
	const currentUserID = "00000001";
	const curr = new Date();
	curr.setDate(curr.getDate());
	const date = curr.toISOString().substring(0, 10);
	const uniqueRecordID = uuid();
	const autoRecordID = uniqueRecordID.slice(0, 8)
	const [toggleState, setToggleState] = useState(1);
  const [accessor, setAccessor] = useState("");

	// Modals
	const [modStatus, setModStatus] = useState(false)
	const [modType, setModType] = useState("")
	const [modName, setModName] = useState("")
	const [modID, setModID] = useState("")
  const [column, setColumn] = useState()

	const toggleTab = (index) => {
		setToggleState(index);
	};


	function submitForm() {
		// console.log("1. Error is " + error + ", Data is " + data);
		if (

			acquireDate.length == 0 ||
			//addRecordID.length == 0 ||
			invoiceNumber.length == 0 ||
			itemID.length == 0 ||
			quantity.length == 0 ||
			//unitID.length == 0 ||
			unitPrice.length == 0 ||
			brandID.length == 0 ||
			// partNumber.length == 0 ||
			supplierID.length == 0 
		//checkSpecial() == true ||
		//	checkYear() == true
	
		) {
			setError(true);
					console.log(
            "" +
              "Date: " +
              acquireDate.length +
              "Invoice: " +
              invoiceNumber.length +
              "Item: " +
              itemID.length +
              "Quantity: " +
              quantity.length +
              "Unit: " +
              unitPrice.length +
              "brand: " +
              brandID.length +
              "Supp: " +
              supplierID.length
          );
//			console.log("Error is: " + error);
		    console.log("date is: "+ acquireDate);
			console.log("Record id is " + addRecordID);

		} else {
			let addInvData = {
				acquireDate: acquireDate,
				addRecordID: generateRandomID(),
				invoiceNumber: invoiceNumber,
				itemID: itemID,
				quantity: quantity,
				unitID: unitID,
				unitPrice: unitPrice,
				brandID: brandID,
				supplierID: supplierID,
				creatorID: currentUserID,
				creationDate: new Date(),
				editorID: currentUserID,
				disabled: isDisabled,
			};

			fetch("/api/inventory/addInventory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(addInvData),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data == "Added Inventory") {
						console.log("SUCCESS");
						setError(false);
						window.location.reload();
					} else {
						setError(true);
					}
				});

			//     console.log("2. Error is " + error + ", Data is " + data);
		}
	}
	function cancelForm() {
		setCancel(true);
	}

	function showInvoiceNumberError() {

		if (error) {
			//Invoice Number is Empty
			if (invoiceNumber.length == 0) {
				return <span className="vehicle-create-error">Input Invoice Number</span>;
			}
			//Invoice Number reached max char length
			else if (invoiceNumber.length > 15 || invoiceNumber.length < 5) {
				return (
					<span className="vehicle-create-error">
						Invoice Number must be 15 numbers long.
					</span>
				);
			}
		}
	}

	function showPartNumberError() {

		if (error) {
			if (partNumber.length > 0) {
				//Part Number reached max char length
				if (partNumber.length > 15 || partNumber.length < 5) {
					return (
						<span className="vehicle-create-error">
							Part Number must be 15 numbers long.
						</span>
					);
				}
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
	function ShowPriceError() {
		if (error) {
			if (unitPrice < 0) {
				return (
					<span className="vehicle-create-error">
						Input must not be negative.
					</span>
				)
			}
		}
	}

	function ShowQuantityError() {
		if (error) {
			if (quantity < 0) {
				return (
					<span className="vehicle-create-error">
						Input must not be negative.
					</span>
				)
			}
		}
	}

  function changeAccessor(){
    if(modName == "Add Supplier"){
      return "supplierName";
    }
    else
      return "brandName";
  }
	function generateRandomID() {
		var min = 10000;
		var max = 99999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return (
    <>
      <div className="container">
        <Modal isOpen={modStatus} className="modal" ariaHideApp={false}>
          <ItemCatTable
            trigger={modStatus}
            setTrigger={setModStatus}
            name={modName}
            type={modType}
            id={modID}
            column={column}
          >
            {" "}
          </ItemCatTable>
        </Modal>

        <div className="content-tabs">
          <TableInventoryAdd InventoryData={inventories}> </TableInventoryAdd>
          <br />
          <br />

          {/* First Field Row */}
          <form>
            <br />

            {/*Second Field Row*/}
            <div className="form-container">
              <div className="form-item">
                <label className="form-labels">Acquired Date: </label> <br />
                <input
                  type="date"
                  id="acquireDate"
                  defaultValue={date}
                  className="form-fields"
                  placeholder="Acquired Date"
                  onChange={(e) => setAcquireDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-item">
                <label className="form-labels">
                  Invoice Number: <label className="required"> * </label>{" "}
                </label>{" "}
                <label className="label-format"> Format: Numbers only. </label>{" "}
                <br />
                <input
                  type="number"
                  id="invoiceNumber"
                  className="form-fields"
                  placeholder="Enter Invoice Number"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                />
                {showInvoiceNumberError()}
                {invoiceNumberError == invoiceNumber &&
                invoiceNumber.length > 0 ? (
                  <span className="inventory-add-invoiceNum-error">
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
                <select
                  className="form-fields"
                  id="itemID"
                  defaultValue={"Item Name"}
                  onChange={(e) => setItemID(e.target.value)}
                  required
                >
                  <option value="">Item Name</option>
                  {items.map((item) => (
                    <option key={item.itemID} value={item.itemID}>
                      {item.itemName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item form-toggle">
                {" "}
                Status:{" "}
                <button
                  type="button"
                  className="table-info-button"
                  onClick={() => setInfoPop(!infoPop)}
                >
                  i
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
                  id="quantity"
                  className="form-fields"
                  placeholder="Enter Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
                {ShowQuantityError()}
                {error && quantity.length == 0 ? (
                  <span className="vehicle-create-error">Input Quantity</span>
                ) : (
                  <></>
                )}
              </div>

              <div className="form-item">
                <label className="form-labels">
                  Unit: <label className="required"> * </label>{" "}
                </label>{" "}
                { /*<button
                  id="select-unit"
                  className="item-icon-button item-add-option-button "
                  type="button"
                  onClick={() => {
                    setModStatus(true);
                    setModName("Add Unit");
                    setModType(units);
                    setModID("UnitTypeID");
                  }}
                >
                  ✎
                </button> */}
                <br />
                <select
                  className="form-fields"
                  id="unitID"
                  defaultValue={"Unit"}
                  onChange={(e) => setUnitID(e.target.value)}
                  required
                >
                  {/* <option value="">Select Unit</option> */}
                  {units.map((unit) => (
                    <option key={unit.unitID} value={unit.unitID}>
                      {unit.unitName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item">
                <label className="form-labels">
                  Unit Price: <label className="required"> * </label>{" "}
                </label>{" "}
                <label className="label-format"> Format: "0000.00" </label>{" "}
                <br />
                <input
                  type="number"
                  id="unitPrice"
                  step=".01"
                  className="form-fields"
                  placeholder="Enter Unit Price"
                  onChange={(e) => setUnitPrice(e.target.value)}
                  required
                />
                {ShowPriceError()}
                {error && unitPrice.length == 0 ? (
                  <span className="vehicle-create-error">Input Unit Price</span>
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
                  id="select-brand"
                  className="item-icon-button item-add-option-button "
                  type="button"
                  onClick={() => {
                    setModStatus(true);
                    setModName("Add Brand");
                    setModType(brands);
                    setModID("itemBrandID");
                    setColumn(INVBRAND_COLUMNS);
                  }}
                >
                  ✎
                </button>
                <br />
                <select
                  className="form-fields"
                  id="brandID"
                  defaultValue={"Brand"}
                  onChange={(e) => setBrandID(e.target.value)}
                  required
                >
                  {/* <option value="">Select Brand</option> */}
                  {brands.map((brand) => (
                    <option key={brand.itemBrandID} value={brand.itemBrandID}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-item">
                <label className="form-labels">Part Number: </label>{" "}
                <label className="label-format"> Format: Numbers only. </label>{" "}
                <br />
                <input
                  type="number"
                  className="form-fields"
                  placeholder="Enter Part Number"
                  onChange={(e) => setpartNumber(e.target.value)}
                  required
                />
                {showPartNumberError()}
                {partNumberError == partNumber && partNumber.length > 0 ? (
                  <span className="inventory-add-partNum-error">
                    Part Number has already been registered.
                  </span>
                ) : (
                  <></>
                )}
              </div>

              <div className="form-item">
                <label className="form-labels">
                  Supplier: <label className="required"> * </label>{" "}
                </label>{" "}
                <button
                  id="select-supplier"
                  className="item-icon-button item-add-option-button "
                  type="button"
                  onClick={() => {
                    setModStatus(true);
                    setModName("Add Supplier");
                    setModType(suppliers);
                    setModID("supplierID");
                    setColumn(INVSUPP_COLUMNS);
                  }}
                >
                  ✎
                </button>
                <br />
                <select
                  className="form-fields"
                  id="supplierID"
                  defaultValue={"Supplier"}
                  onChange={(e) => setSupplierID(e.target.value)}
                  required
                >
                 {/* } <option value="Select Supplier">Select Supplier</option>
                  <option value="2001">Iriga Joe Hardware</option>
				<option value="2002">Anderson Depot</option> */}
                   {suppliers.map((supplier) => (
                    <option
                      key={supplier.supplierID}
                      value={supplier.supplierID}
                    >
                      {supplier.supplierName}
                    </option>
                  )
				  )} 
                </select>
              </div>
            </div>
            <br />
            <br />
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
          </form>
        </div>
      </div>
    </>
  );
}

export default AddInventoryCreate;
