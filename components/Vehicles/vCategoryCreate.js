import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch";

function AddVehicleCategory({ trigger, setTrigger, name, type, id }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultID, setDefaultID] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [notifResult, setNotifResult] = useState("")

  function submitForm(){

    if(categoryName.length == 0 )
      setError(true);
    else{
        
      let categoryData = {
        [id] : defaultID,
        name : categoryName,
        disabled: isDisabled,
      }

      fetch("/api/vehicles/categories/Create" + name.replace(/ /g, ""), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then((res) => res.json())
        .then((data) => {
        //    console.log(JSON.stringify(categoryData));
          if (data == "created") {
            console.log("SUCCESS");
            setNotifResult("Successfully created!")
            setError(false);
            window.location.reload();
          } else {
            setError(true);
            setNameError(data);
            console.log("Duplicate ID is" + nameError);
          }
        });
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

  useEffect(() => {
  if (JSON.stringify(type) === "{}") {
    if(name == "Vehicle Type")
      setDefaultID("60000");
    else if (name == "Vehicle Brand")
      setDefaultID("70000");
    else if (name == "Transmission Type")
      setDefaultID("21000");
    else if(name == "Engine Type")
      setDefaultID("31000");
    else if(name == "GPS Provider")
      setDefaultID("51000");
    else if(name =="Fuel Level Sensor")
      setDefaultID("61000");
    console.log(defaultID + " Empty Collection: " + name.replace(/ /g, ""));
  } else {
    setDefaultID(Math.max(...type.map((type) => JSON.parse(type[id]))) + 1);
    console.log(defaultID + " " + name.replace(/ /g, ""));
  }
  }, [defaultID]);

  return (
    <>
      <div className="item-modal">
        {showResult()}
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>{name}</h1>
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
          <input
            type="text"
            className="form-fields"
            placeholder="Enter Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
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
          onClick={() => submitForm()}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default AddVehicleCategory;
