import React, {useState, useEffect} from 'react'

import ToggleSwitch from '../ToggleSwitch';

function AddItemBrand({itemID, trigger, setTrigger, name, type, id}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [defaultID, setDefaultID] = useState("")
    const [brandName, setBrandName] = useState("")
    const [error, setError] = useState(false);
    const [nameError, setNameError] = useState("");
    const [notifResult, setNotifResult] = useState("")

    function submitForm(){
        if(brandName.length == 0 )
          setError(true);
        else{
            
          let brandData = {
            itemBrandID : defaultID,
            itemBrandName : brandName,
            disabled: isDisabled,
          }
    
          fetch("/api/items/createBrand", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(brandData),
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
            if (type.length == 0) {
              if (name == "Select Brand") {
                  setDefaultID("10000");
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
                    <h1>ITEM BRAND</h1>
                    <h2>ADD OPTION</h2>
                </div>
                <button className="item-icon-button item-x-button" onClick={() => setTrigger(false)}>X</button>
            </div>

            <div className="item-input">
                <label htmlFor="brandName">Brand Name:</label>
                <input 
                    type="text"
                    className="form-fields"
                    placeholder="Enter Brand Name"
                    name="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
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

export default AddItemBrand;