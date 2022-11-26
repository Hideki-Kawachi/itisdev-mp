import React, { useState } from "react";
import Link from "next/link";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import VCatTable from "../../components/Vehicles/vCategoryList";
import Modal from 'react-modal';


function VehicleCreate({vtype, brand, engine, sensor, transmission, gpsDATA}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [vTypeOpen, setvTypeOpen] = useState(false);
  const [otype, setOType] = useState();
  const [name, setName] = useState("");

  const changeType = e => {
    const { type, value } = e.target;
    setOType(prevState => ({
      ...prevState, [name] : value
    }));
  };

  return (
    <>
      {/* First Field Group */}

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
            Plate Number: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-fields"
            placeholder="Enter Plate Number"
          />
        </div>
        <div className="form-item">
          <label className="form-labels">
            Vehicle Type: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
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
            <VCatTable trigger={vTypeOpen} setTrigger= {setvTypeOpen} name = {name} type = {otype} > </VCatTable>
          </Modal>
          <br />
          <select
            type="text"
            className="form-fields"
            placeholder="Select Vehicle Type"
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
            Brand: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
            onClick={() => {
              setName("VEHICLE BRAND"); setOType(brand); setvTypeOpen(true);
            }}
          >
            {" "}
            ✎{" "}
          </button>
          <br />
          <select className="form-fields" />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Manufacturing Year: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-fields"
            placeholder="Enter Manufacturing Year"
          />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Transmission Type: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
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
          <select className="form-fields" />
        </div>
      </div>

      <br />
      <hr />
      {/* Third Field Row */}

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
            Engine Number: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-fields"
            placeholder="Enter Engine Number"
          />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Engine Type: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
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
          <select className="form-fields" />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Chassis: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-fields"
            placeholder="Select Chassis"
          />
        </div>
      </div>

      <br />

      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
            Insurance Amount: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="text"
            className="form-fields"
            placeholder="Enter Insurance Amount"
          />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Insurance Expiry Date: <label className="required"> * </label>{" "}
          </label>{" "}
          <br />
          <input
            type="date"
            className="form-fields"
            placeholder="Enter Insurance Expiry Date"
          />
        </div>
      </div>
      <br />
      <hr />
      <div className="form-container">
        <div className="form-item">
          <label className="form-labels">
            GPS Provider Name: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
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
          <select className="form-fields" />
        </div>

        <div className="form-item">
          <label className="form-labels">
            Fuel Level Sensor Name: <label className="required"> * </label>{" "}
          </label>{" "}
          <button
            className="vehicle-icon-button vehicle-add-option-button "
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
            className="form-fields"
            placeholder="Select Fuel Level Sensor Name"
          />
        </div>

        <br />
      </div>
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
    </>
  );
}

export default VehicleCreate;
