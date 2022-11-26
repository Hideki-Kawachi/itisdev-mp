import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import BasicTable from "../../components/Vehicles/VehicleTable";
import dbConnect from "../../lib/dbConnect";
import Vehicle from "../../models/VehicleSchema";
import Brand from "../../models/BrandSchema";
import EngineType from "../../models/EngineSchema";
import FuelSensor from "../../models/FuelSensorSchema";
import Transmission from "../../models/TransmissionSchema";
import VehicleType from "../../models/VehicleTypeSchema";
import gpsProvider from "../../models/GPSSchema";

export async function getServerSideProps() {
  await dbConnect();

  const vehicleList = await Vehicle.find(
    {},
    {
      plateNum: 1,
      transmissionID: 1,
      brandID: 1,
      vehicleTypeID: 1,
      insuranceExpDate: 1,
      disabled: 1,
    }
  );
   const typeList = await VehicleType.find(
     {},
     {
       vehicleTypeID: 1,
       name: 1,
       disabled: 1,
     }
   );
   const brandList = await Brand.find(
     {},
     {
       brandID: 1,
       name: 1,
       disabled: 1,
     }
   );

   const engineList = await EngineType.find(
     {},
     {
       engineTypeID: 1,
       name: 1,
       disabled: 1,
     }
   );

   const sensorList = await FuelSensor.find(
     {},
     {
       FuelSensorID: 1,
       name: 1,
       disabled: 1,
     }
   );

   const transmissionList = await Transmission.find(
     {},
     {
       transmissionID: 1,
       name: "1",
       disabled: 1,
     }
   );

   const gpsList = await gpsProvider.find(
     {},
     {
       GPSProviderID: 1,
       name: 1,
       disabled: 1,
     }
   );

 let vehicleData = JSON.stringify(vehicleList);
 let typeData = JSON.stringify(typeList);
 let brandData = JSON.stringify(brandList);
 let engineData = JSON.stringify(engineList);
 let sensorData = JSON.stringify(sensorList);
 let transmissionData = JSON.stringify(transmissionList);
 let gpsData = JSON.stringify(gpsList);

  return { props: { vehicleData, typeData, brandData, engineData, sensorData, transmissionData, gpsData} };
}

function Vehicles({
  vehicleData,
  typeData,
  brandData,
  engineData,
  sensorData,
  transmissionData,
  gpsData,
}) {
  const vehicles = JSON.parse(vehicleData);
  const vtypes = JSON.parse(typeData);
  const brands = JSON.parse(brandData);
  const engines = JSON.parse(engineData);
  const sensors = JSON.parse(sensorData);
  const transmissions = JSON.parse(transmissionData);
  const gpsDATA = JSON.parse(gpsData);

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
          <BasicTable vehicle={vehicles}> </BasicTable>
        </div>
      </div>
    </>
  );
}

export default Vehicles;
