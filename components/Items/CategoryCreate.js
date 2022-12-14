import React, {useState, useEffect} from 'react'

import ToggleSwitch from '../ToggleSwitch';

function AddItemCategory({trigger, setTrigger, name, type, id}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [defaultID, setDefaultID] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [error, setError] = useState(false);
    const [nameError, setNameError] = useState("");
    const [notifResult, setNotifResult] = useState("")

    function submitForm(){
        if(categoryName.length == 0 )
          setError(true);
        else{
            
          let categoryData = {
            [id]: defaultID,
            name : categoryName,
            disabled: isDisabled,
          }
    
          fetch("/api/items/categories/create" + name.split(" ")[1], {
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
          // TEMPORARY ONLY
          console.log(name)
            if (type.length == 0) {
              if (name == "Select Category") {
                  setDefaultID("60000");
                }
              else if (name ==  "Add Brand") {
                setDefaultID("50000")
              } 
            } else {
              setDefaultID(String(Math.max(...type.map((type) => JSON.parse(type[id]))) + 1));
            }
            }, [defaultID]);

  return (
    <>
        <form onSubmit={submitForm} className="item-modal">
            <div className="item-header item-modal-header">
                <div className="item-column-container">
                    <h1>{name}</h1>
                    <h2>ADD OPTION</h2>
                </div>
                <button className="item-icon-button item-x-button" onClick={() => setTrigger(false)}>X</button>
            </div>

            <div className="item-input">
                <label htmlFor="categoryName">{name.split(" ")[1]} Name:</label>
                <input 
                    type="text"
                    className="form-fields"
                    placeholder="Enter Category Name"
                    name="categoryName"
                    value={categoryName}
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
            <button className="green-button-container add-button" 
                    id="item-modal-button"
                    type="submit">
                Add 
            </button>
        </form>
    </>
  )
}

export default AddItemCategory;