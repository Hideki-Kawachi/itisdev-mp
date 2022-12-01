import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";
import LockedToggle from "../../components/LockedToggle";
import BasicButton from "../../components/BasicButton";
import VCatTable from "../../components/Vehicles/vCategoryList";
import Modal from "react-modal";
import Cancel from "../../components/Pop-up/cancel";

function VehicleEdit({ plateNum, vtype, brand, engine, sensor, transmission, gpsDATA }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [vTypeOpen, setvTypeOpen] = useState(false);
  const [otype, setOType] = useState();
  const [name, setName] = useState("");
  const [cancel, setCancel] = useState(false);
  const [vehicleTypeID, setVehicleTypeID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const [engineNum, setEngineNum] = useState("");
  const [transmissionID, setTransmissionID] = useState("");
  const [engineTypeID, setEngineTypeID] = useState("");
  const [chassisID, setChassisID] = useState("");
  const [gpsID, setGpsID] = useState("");
  const [fuelSensorID, setFuelSensorID] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState("");
  const [insuranceExpDate, setInsuranceExpDate] = useState("");
  const [error, setError] = useState(false);
  const [isEditable, setEditable] = useState(false)
  const [notifResult, setNotifResult] = useState("");
  const dt = new Date();
 

  	useEffect(() => {
      console.log("EDITING:", plateNum);
      fetch("/api/vehicles/" + plateNum, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
        //  console.log("RECEIVED DATA:", data);
          setVehicleTypeID(data.vehicleTypeID);
          setBrandID(data.brandID);
          setManufacturingYear(data.manufacturingYear);
          setEngineNum(data.engineNum);
          setTransmissionID(data.transmissionID);
          setEngineTypeID(data.engineTypeID);
          setChassisID(data.chassisID);
          setGpsID(data.gpsID);
          setFuelSensorID(data.fuelSensorID);
          setInsuranceAmount(data.insuranceAmount);
          setInsuranceExpDate(
            new Date(data.insuranceExpDate).toISOString().split("T")[0]
          );
          setIsDisabled(data.disabled);
          console.log(insuranceExpDate);
        })
    }, [plateNum]);

    	useEffect(() => {
        if (notifResult.length > 0) {
          console.log("result is:", notifResult);
          setTimeout(() => setNotifResult(""), 3000);
        }
      }, [notifResult]);

  function submitForm() {
    // console.log("1. Error is " + error + ", Data is " + data);
    if (
      vehicleTypeID.length == 0 ||
      brandID.length == 0 ||
      manufacturingYear.length == 0 ||
      engineNum.length == 0 ||
      transmissionID.length == 0 ||
      chassisID.length == 0 ||
      gpsID.length == 0 ||
      fuelSensorID.length == 0 ||
      insuranceAmount.length == 0 ||
      insuranceExpDate.length == 0 ||
      checkYear() == true ||
      (manufacturingYear.length != 4 && manufacturingYear.length != 0) ||
      insuranceAmount < 0
    ) {
      setError(true);
    } else {
      let vehicleData = {
        plateNum: plateNum,
        vehicleTypeID: vehicleTypeID,
        brandID: brandID,
        manufacturingYear: manufacturingYear,
        transmissionID: transmissionID,
        engineNum: engineNum,
        engineTypeID: engineTypeID,
        chassisID: chassisID,
        gpsID: gpsID,
        fuelSensorID: fuelSensorID,
        insuranceAmount: insuranceAmount,
        insuranceExpDate: insuranceExpDate,
        disabled: isDisabled,
      };

      fetch("/api/vehicles/updateVehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotifResult(data);
          if (data != "No Fields Edited") {
            setTimeout(() => window.location.reload(), 800);
          }
        });
      //     console.log("2. Error is " + error + ", Data is " + data);
    }
  }
  function cancelForm() {
    setCancel(true);
  }

  function checkYear() {
    return (
      parseInt(manufacturingYear) < 1900 ||
      parseInt(manufacturingYear) > dt.getFullYear()
    );
  }

  function showYearError() {
    if (error) {
      if (
        checkYear() ||
        (manufacturingYear.length != 4 && manufacturingYear.length != 0)
      ) {
        return (
          <span className="vehicle-create-error">
            Enter valid Manufacturing Year
          </span>
        );
      }
    }
  }

  function ShowInsuranceError() {
    if (error) {
      if (insuranceAmount < 0) {
        return (
          <span className="vehicle-create-error">
            Input must not be negative
          </span>
        );
      }
    }
  }

  function enableEdit(){
    setEditable(true);
  }
  return (
    <>
      {/* First Field Group */}
      <form>
        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">Plate Number:</label> <br />
            <input
              name="input"
              type="text"
              className="form-fields"
              value={plateNum}
              disabled
              onChange={(e) => setPlateNum(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label className="form-labels">
              Vehicle Type:{" "}
              <label  className="required" disabled={isEditable}>
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              disabled={!isEditable}
              onClick={() => {
                setName("VEHICLE TYPE");
                setOType(vtype);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <Modal isOpen={vTypeOpen} className="modal">
              <VCatTable
                trigger={vTypeOpen}
                setTrigger={setvTypeOpen}
                name={name}
                type={otype}
              >
                {" "}
              </VCatTable>
            </Modal>
            <Modal isOpen={cancel} className="modal">
              <Cancel
                trigger={cancel}
                setTrigger={setCancel}
                transaction={" Editing of Vehicle"}
              ></Cancel>
            </Modal>
            <br />
            <select
              type="text"
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setVehicleTypeID(e.target.value)}
              required
            >
              {vtype.map((vehicleType) => {
                if (vtype.vehicleTypeID == vehicleTypeID) {
                  return (
                    <option
                      key={vehicleType.vehicleTypeID}
                      value={vehicleType.vehicleTypeID}
                    >
                      {vehicleType.name}
                    </option>
                  );
                } else {
                  return (
                    <option
                      key={vehicleType.vehicleTypeID}
                      value={vehicleType.vehicleTypeID}
                    >
                      {vehicleType.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && vehicleTypeID.length == 0 ? (
              <span className="vehicle-create-error">Select Vehicle Type</span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item form-toggle">
            {" "}
            Status:{" "}
            <button
              className="item-icon-button item-info-option-button "
              disabled={!isEditable}
              onClick={() => setTrigger(!trigger)}
            >
              {" "}
              i{" "}
            </button>
            <br />
         {isEditable == false ? (    
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
        {/* Second Field Group */}
        <br />
        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">
              Brand:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button"
              disabled={!isEditable}
              onClick={() => {
                setName("VEHICLE BRAND");
                setOType(brand);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setBrandID(e.target.value)}
              required
            >
              {brand.map((brand) => {
                if (brand.brandID == brandID) {
                  return (
                    <option key={brand.brandID} value={brand.brandID} selected>
                      {brand.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={brand.brandID} value={brand.brandID}>
                      {brand.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && brandID.length == 0 ? (
              <span className="vehicle-create-error">Select Vehicle Brand</span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Manufacturing Year:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <br />
            <input
              name="input"
              type="number"
              className="form-fields"
              value={manufacturingYear}
              disabled={!isEditable}
              onChange={(e) => setManufacturingYear(e.target.value)}
            />
            {showYearError()}
            {error && manufacturingYear.length == 0 ? (
              <span className="vehicle-create-error">
                Input Manufacturing Year
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Transmission Type: <label className="required"> * </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              disabled={!isEditable}
              onClick={() => {
                setName("TRANSMISSION TYPES");
                setOType(transmission);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setTransmissionID(e.target.value)}
              required
            >
              {transmission.map((transmission) => {
                if (transmission.transmissionID == transmissionID) {
                  return (
                    <option
                      key={transmission.transmissionID}
                      value={transmission.transmissionID}
                      selected
                    >
                      {transmission.name}
                    </option>
                  );
                } else {
                  return (
                    <option
                      key={transmission.transmissionID}
                      value={transmission.transmissionID}
                    >
                      {transmission.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && transmissionID.length == 0 ? (
              <span className="vehicle-create-error">
                Select Transmission Type
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <br />
        <hr />
        {/* Third Field Row */}

        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">
              Engine Number:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <br />
            <input
              name="input"
              type="text"
              className="form-fields"
              value={engineNum}
              onChange={(e) => setEngineNum(e.target.value)}
              disabled={!isEditable}
            />
            {error && engineNum.length == 0 ? (
              <span className="vehicle-create-error">Input Engine Number</span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Engine Type:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              disabled={!isEditable}
              onClick={() => {
                setName("ENGINE TYPES");
                setOType(engine);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setEngineTypeID(e.target.value)}
              required
            >
              {engine.map((engine) => {
                if (engine.engineTypeID == engineTypeID) {
                  return (
                    <option
                      key={engine.engineTypeID}
                      value={engine.engineTypeID}
                      selected
                    >
                      {engine.name}
                    </option>
                  );
                } else {
                  return (
                    <option
                      key={engine.engineTypeID}
                      value={engine.engineTypeID}
                    >
                      {engine.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && engineTypeID.length == 0 ? (
              <span className="vehicle-create-error">Select Engine Type</span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Chassis:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <br />
            <input
              name="input"
              type="text"
              className="form-fields"
              value={chassisID}
              disabled={!isEditable}
              onChange={(e) => setChassisID(e.target.value)}
            />
            {error && chassisID.length == 0 ? (
              <span className="vehicle-create-error">Input Chassis</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        <br />

        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">
              Insurance Amount:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <label className="label-format"> Format: "0000.00" </label> <br />
            <input
              name="input"
              type="number"
              step=".01"
              className="form-fields"
              value={insuranceAmount}
              disabled={!isEditable}
              onChange={(e) => setInsuranceAmount(e.target.value)}
            />
            {ShowInsuranceError()}
            {error && insuranceAmount.length == 0 ? (
              <span className="vehicle-create-error">
                Input Insurance Amount
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Insurance Expiry Date:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <br />
            <input
              name="input"
              type="date"
              className="form-fields"
              defaultValue={insuranceExpDate}
              disabled={!isEditable}
              onChange={(e) => setInsuranceExpDate(e.target.value)}
            />
            {error && insuranceExpDate.length == 0 ? (
              <span className="vehicle-create-error">
                Input Insurance Expiry Date
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <br />
        <hr />
        <div className="form-container">
          <div className="form-item">
            <label className="form-labels">
              GPS Provider Name:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              disabled={!isEditable}
              onClick={() => {
                setName("GPS PROVIDER");
                setOType(gpsDATA);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setGpsID(e.target.value)}
              required
            >
              {gpsDATA.map((gpsProvider) => {
                if (brand.brandID == brandID) {
                  return (
                    <option
                      key={gpsProvider.GPSProviderID}
                      value={gpsProvider.GPSProviderID}
                      selected
                    >
                      {gpsProvider.name}
                    </option>
                  );
                } else {
                  return (
                    <option
                      key={gpsProvider.GPSProviderID}
                      value={gpsProvider.GPSProviderID}
                    >
                      {gpsProvider.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && gpsID.length == 0 ? (
              <span className="vehicle-create-error">
                Input GPS Provider Name
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="form-item">
            <label className="form-labels">
              Fuel Level Sensor Name:{" "}
              <label  className="required">
                {" "}
                *{" "}
              </label>{" "}
            </label>{" "}
            <button
              className="vehicle-icon-button vehicle-add-option-button "
              disabled={!isEditable}
              onClick={() => {
                setName("FUEL LEVEL SENSOR");
                setOType(sensor);
                setvTypeOpen(true);
              }}
            >
              {" "}
              ✎{" "}
            </button>
            <br />
            <select
              className="select-form"
              disabled={!isEditable}
              onChange={(e) => setFuelSensorID(e.target.value)}
              required
            >
              {" "}
              {sensor.map((fuelSensor) => {
                if (fuelSensor.FuelSensorID == fuelSensorID) {
                  return (
                    <option
                      key={fuelSensor.FuelSensorID}
                      value={fuelSensor.FuelSensorID}
                      selected
                    >
                      {fuelSensor.name}
                    </option>
                  );
                } else {
                  return (
                    <option
                      key={fuelSensor.FuelSensorID}
                      value={fuelSensor.FuelSensorID}
                    >
                      {fuelSensor.name}
                    </option>
                  );
                }
              })}
            </select>
            {error && fuelSensorID.length == 0 ? (
              <span className="vehicle-create-error">
                Select Fuel Sensor Name
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="form-container">
          <span className="form-item-buttons">
            <BasicButton
              label={"Cancel"}
              color={"gray"}
              type={"reset"}
              clickFunction={cancelForm}
            ></BasicButton>
            {isEditable ? (
              <BasicButton
                label={"Save"}
                color={"green"}
                type={"button"}
                clickFunction={submitForm}
              ></BasicButton>
            ) : (
              <BasicButton
                label={"Edit ✎"}
                color={"green"}
                type={"button"}
                clickFunction={enableEdit}
              ></BasicButton>
            )}
          </span>
        </div>
        <br></br>
      </form>
    </>
  );
}

export default VehicleEdit;