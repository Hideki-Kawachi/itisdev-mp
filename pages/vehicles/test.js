import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import VCatTable from "../../components/Vehicles/vCategoryList";

function Vehicles() {
  return (
    <>
      <Header
        page={"VEHICLES"}
        subPage={"HOME"}
        user={"Example N. Name"}
      ></Header>
      <NavBar></NavBar>
      <div id="main-container">
        <div className="main-container-bg">
          <br />
          <VCatTable> </VCatTable>
        </div>
      </div>
    </>
  );
}

export default Vehicles;
