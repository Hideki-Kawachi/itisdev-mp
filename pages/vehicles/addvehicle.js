import React, {useState} from "react";
import { Router, useRouter } from "next/router";

import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import ToggleSwitch from "../../components/ToggleSwitch";
import BasicButton from "../../components/BasicButton";
import VCatTable from "../../components/Vehicles/vCategoryList";
import VehicleCreate from "../../components/Vehicles/VehicleCreate";
import dbConnect from "../../lib/dbConnect";
import Vehicle from "../../models/VehicleSchema";
import Brand from "../../models/BrandSchema";
import EngineType from "../../models/EngineSchema";
import FuelSensor from "../../models/FuelSensorSchema";
import Transmission from "../../models/TransmissionSchema";
import VehicleType from "../../models/VehicleTypeSchema";
import Link from "next/link"
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
      name: 1,
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
  // console.log(transmissionList);
  let vehicleData = JSON.stringify(vehicleList);
  let typeData = JSON.stringify(typeList);
  let brandData = JSON.stringify(brandList);
  let engineData = JSON.stringify(engineList);
  let sensorData = JSON.stringify(sensorList);
  let transmissionData = JSON.stringify(transmissionList);
  let gpsData = JSON.stringify(gpsList);

  return {
    props: {
      vehicleData,
      typeData,
      brandData,
      engineData,
      sensorData,
      transmissionData,
      gpsData,
    },
  };
}

function AddVehicle({
  vehicleData,
  typeData,
  brandData,
  engineData,
  sensorData,
  transmissionData,
  gpsData,
}) {
  const router = useRouter();
  const vehicles = JSON.parse(vehicleData);
  const vtypes = JSON.parse(typeData);
  const brands = JSON.parse(brandData);
  const engines = JSON.parse(engineData);
  const sensors = JSON.parse(sensorData);
  const transmissions = JSON.parse(transmissionData);
  const gps = JSON.parse(gpsData);

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
        <>
          <VehicleCreate
            vtype={vtypes}
            brand={brands}
            engine={engines}
            sensor={sensors}
            transmission={transmissions}
            gpsDATA={gps}
          />
        </>
      <Link href = "editvehicle"> edit vehicle </Link>

      </div>
    </>
  );
}

export default AddVehicle;
