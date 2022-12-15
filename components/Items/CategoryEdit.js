import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch";
import BasicButton from "../BasicButton";

function EditItemCategory({ trigger, setTrigger, name,  catname, id, selected, status}) {
  const [isDisabled, setIsDisabled] = useState(status);
  const [defaultID, setDefaultID] = useState("");
  const [categoryName, setCategoryName] = useState(catname);
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [notifResult, setNotifResult] = useState("");
  const [reason, setReason] = useState("(Required field not filled up.)");

  	useEffect(() => {
    //  console.log("EDITING:", selected);
    //  console.log("/api/vehicles/Edit" + name.replace(/ /g, ""));
    //   console.log("/api/vehicles/categories" + "/find/" + name.replace(/ /g, "") + "/" + selected);
      fetch(
        "/api/items/categories" +
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
          setCategoryName(data.name)
        });
    }, [selected]);

    useEffect(() => {
      if (notifResult.length > 0) {
        console.log("result is:", notifResult);
        setTimeout(() => setNotifResult(""), 3000);
      }
    }, [notifResult]);
    function cancelForm() {
      setTrigger(!trigger);
    }
  function submitForm() {
    // console.log("1. Error is " + error + ", Data is " + data);
    //console.log("name " + categoryName);
    if (
     categoryName.length == 0
    ) {
      setError(true);
      setReason("(Name cannot be blank)")
    } else {
      let categoryData = {
        [id]: selected,
        name: categoryName,
        disabled: isDisabled,
      };
      //console.log(JSON.stringify(categoryData));
      fetch("/api/items/categories/edit/update" + name.split(" ")[1], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then((res) => res.json())
        .then((data) => {
          setNotifResult(data);
          if (data == categoryName) {
            setError(true);
            setNameError(data);
            setReason("(Name already exists or no changes detected)");
         //   console.log("Duplicate Name is" + data);
          } else if (data == "Successfully Edited!") {
            setError(false);
            setTimeout(() => window.location.reload(), 800);
          } else {
            setError(true);
            setReason("(No changes detected)");
          }

        });
      //     console.log("2. Error is " + error + ", Data is " + data);
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


  return (
    <>
      <div className="item-modal">
        {showResult()}
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
            <b> {catname} </b>
          </label>
          <br />

          <label htmlFor="itemName">
            New Category Name: <label className="required"> * </label>
          </label>

          <input
            type="text"
            className="form-fields"
            value = {categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {error ? (
            <span className="vehiclecat-create-error">
              Input new category name. {reason}
            </span>
          ) : (
            <></>
          )}
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

export default EditItemCategory;
