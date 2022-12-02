import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch";
import BasicButton from "../BasicButton";

function EditVehicleCategory({ trigger, setTrigger, name, type, id, selected }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [defaultID, setDefaultID] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [currentName, setCurrentName]= useState("");
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [notifResult, setNotifResult] = useState("");
  const[cancel, setCancel] = useState(false);

  	useEffect(() => {
      console.log("EDITING:", selected);
      console.log("/api/vehicles/Edit" + name.replace(/ /g, ""));
    //   console.log("/api/vehicles/categories" + "/find/" + name.replace(/ /g, "") + "/" + selected);
      fetch(
        "/api/vehicles/categories" +
          "/find/" +
          name.replace(/ /g, "") + "/" + selected,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("RECEIVED id:", id);
          console.log("RECEIVED DATA:", data);
          setDefaultID(selected);
          setCategoryName(data.name);
          setCurrentName(data.name);
          setIsDisabled(data.disabled);
        });
    }, [selected]);

    useEffect(() => {
      if (notifResult.length > 0) {
        console.log("result is:", notifResult);
        setTimeout(() => setNotifResult(""), 3000);
      }
    }, [notifResult]);
    function cancelForm() {
      setCancel(true);
    }
  function submitForm() {
    // console.log("1. Error is " + error + ", Data is " + data);
    if (
     categoryName.length == 0
    ) {
      setError(true);
    } else {
      let categoryData = {
        [id]: selected,
        name: categoryName,
        disabled: isDisabled,
      };
      console.log(JSON.stringify(categoryData));
      fetch("/api/vehicles/categories/edit/update" + name.replace(/ /g, ""), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotifResult(data);
        //   if (data != "No Fields Edited") {
        //     setTimeout(() => window.location.reload(), 800);
        //   }
        });
      //     console.log("2. Error is " + error + ", Data is " + data);
    }
  }


  return (
    <>
      <div className="item-modal">
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>{name}</h1>
            <h2>EDIT OPTION</h2>
          </div>
          <button
            className="item-icon-button item-x-button"
            onClick={() => setTrigger(!trigger)}
          >
            X
          </button>
        </div>

        <div className="item-input">
          <label htmlFor="itemName">Current Category Name:</label>
          <label className="itemName">
            {" "}
            <b> {currentName} </b>
          </label>
          <br/>
          
          <label htmlFor="itemName">New Category Name:</label>
          
          <input
            type="text"
            className="form-fields"
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
        <BasicButton
          label={"Save"}
          color={"green"}
          type={"button"}
          clickFunction={submitForm}
        ></BasicButton>
        <BasicButton
          label={"Cancel"}
          color={"red"}
          type={"reset"}
          clickFunction={cancelForm}
        ></BasicButton>
      </div>
    </>
  );
}

export default EditVehicleCategory;
