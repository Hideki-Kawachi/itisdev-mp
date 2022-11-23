import React, {useState} from "react";
import { Router, useRouter } from "next/router";

import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import VCatTable from "../../components/Vehicles/vCategoryList";
import VehicleCreate from "../../components/Vehicles/VehicleCreate";
import AddVehicleCategory from "../../components/Vehicles/vCategoryCreate";

function AddVehicle({ trigger, setTrigger }) {
  const router = useRouter();
  const [categoryPopupOn, setCategoryPopupOn] = useState(false);

  return (
    <>
      <Header
        page={"VEHICLES"}
        subPage={"ADD VEHICLE"}
        user={"Example N. Name"}
      ></Header>
      <NavBar></NavBar>
      <br />
      <div id="main-container">
        {categoryPopupOn ? (
          <>
            <div className="item-modal-bg">
              <VCatTable
              />
            </div>
            <VehicleCreate
              trigger={categoryPopupOn}
              setTrigger={setCategoryPopupOn}
            />
          </>
        ) : (
          <div id="main-container-bg">
            <VehicleCreate
              trigger={categoryPopupOn}
              setTrigger={setCategoryPopupOn}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AddVehicle;
