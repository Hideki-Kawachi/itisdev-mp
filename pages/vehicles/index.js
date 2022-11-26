import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import BasicTable from "../../components/Vehicles/VehicleTable";
import dbConnect from "../../lib/dbConnect";
import Vehicle from "../../models/VehicleSchema";



 export async function getServerSideProps() {
   await dbConnect();
   const vehicleList = await Vehicle.find({}, {plateNum: 1, transmissionID: 1, brandID: 1, vehicleTypeID: 1} );

   let vehicleData = JSON.stringify(vehicleList);
//    console.log(vehicleList);

   return { props: { vehicleData } };
 }

function Vehicles({vehicleData}) {
	const vehicles = JSON.parse(vehicleData);
	console.log(typeof vehicleData);

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
          <BasicTable vehicle = {vehicles}> </BasicTable>
        </div>
      </div>
    </>
  );
}

export default Vehicles;
