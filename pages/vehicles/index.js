import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import BasicTable from "../../components/Vehicles/VehicleTable";
import dbConnect from "../../lib/dbConnect";
import Vehicle from "../../models/VehicleSchema";
import Brand from "../../models/BrandSchema";
import Transmission from "../../models/TransmissionSchema";
import VehicleType from "../../models/VehicleTypeSchema";


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

   const transmissionList = await Transmission.find(
     {},
     {
       transmissionID: 1,
       name: "1",
       disabled: 1,
     }
   );


 let vehicleData = JSON.stringify(vehicleList);
 let typeData = JSON.stringify(typeList);
 let brandData = JSON.stringify(brandList);
 let transmissionData = JSON.stringify(transmissionList);

  return { props: { vehicleData, typeData, brandData, transmissionData} };
}

function Vehicles({vehicleData}) {
  const vehicles = JSON.parse(vehicleData);


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
          <BasicTable vehicle={vehicles}>
            {" "}
          </BasicTable>
        </div>
      </div>
    </>
  );
}

export default Vehicles;
