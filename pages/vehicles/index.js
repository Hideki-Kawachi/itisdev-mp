import React, {useMemo} from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import VehicleTable from "../../components/Vehicles/VehicleTable";
import dbConnect from "../../lib/dbConnect";
import Vehicle from "../../models/VehicleSchema";
import Brand from "../../models/BrandSchema";
import Transmission from "../../models/TransmissionSchema";
import VehicleType from "../../models/VehicleTypeSchema";
import { ironOptions } from "../../lib/config";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
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
					name: 1,
					disabled: 1,
				}
			);

			let vehicleData = JSON.stringify(vehicleList);
			let typeData = JSON.stringify(typeList);
			let brandData = JSON.stringify(brandList);
			let transmissionData = JSON.stringify(transmissionList);

			return {
				props: {
					vehicleData,
					typeData,
					brandData,
					transmissionData,
					currentUser,
				},
			};
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

function Vehicles({ vehicleData, currentUser, typeData, brandData, transmissionData}) {
  const vehicles = JSON.parse(vehicleData);
  const vTypes = JSON.parse(typeData);
  const brands = JSON.parse(brandData);
  const transmissions = JSON.parse(transmissionData);

	//converts vehicle IDs to names for the table
  useMemo(() =>{
   vehicles.forEach((vehicle) => {
	vTypes.forEach((vtype) =>{
				if (vehicle.vehicleTypeID == vtype.vehicleTypeID) {
				vehicle.vehicleTypeID = vtype.name;
				}
	});
	brands.forEach((brand) => {
      if (vehicle.brandID == brand.brandID) {
		vehicle.brandID = brand.name;
      }
    });

	transmissions.forEach((transmission) => {
      if (vehicle.transmissionID == transmission.transmissionID) {
        vehicle.transmissionID = transmission.name;
      }
    });

	vehicle.insuranceExpDate = new Date(vehicle.insuranceExpDate).toISOString().split("T")[0];
  })
}, [])



  return (
    <>
      <Header page={"VEHICLES"} subPage={"HOME"} user={currentUser}></Header>
      <NavBar user={currentUser}></NavBar>
      <div id="main-container">
        <div className="main-container-bg">
          <br />
          <VehicleTable vehicle={vehicles}> </VehicleTable>
          {/* // vtype={vTypes} brand={brands} transmission={transmissions} */}
        </div>
      </div>
    </>
  );
}

export default Vehicles;
