import React from "react";
import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import dbConnect from "../../lib/dbConnect";
import unitType from "../../models/UnitTypeSchema";
import Brand from "../../models/BrandSchema";
import Supplier from "../../models/SupplierSchema";
import AddInventoryCreate from "../../components/Inventory/AddInventoryCreate";
import PullInventoryCreate from "../../components/Inventory/PullInventoryCreate";
import Vehicles from "../../models/VehicleSchema";
import Item from "../../models/ItemSchema";
import ItemBrandCombination from "../../models/ItemBrandCombinationSchema";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			await dbConnect();

			const unitList = await unitType.find(
				{ disabled: false },
				{ UnitTypeID: 1, UnitTypeName: 1 }
			);

			const brandList = await Brand.find(
				{ disabled: false },
				{ brandID: 1, name: 1 }
			);

			const supplierList = await Supplier.find(
				{ disabled: false },
				{ supplierID: 1, supplierName: 1 }
			);

			const vehicleList = await Vehicles.find(
				{ disabled: false },
				{ plateNum: 1 }
			);

			const itemList = await Item.find(
				{ quantity: { $gt: 0 }, disabled: false },
				{ itemID: 1, itemName: 1, unitID: 1, quantity: 1, minQuantity: 1 }
			);

			const itemBrandList = await ItemBrandCombination.find(
				{ quantity: { $gt: 0 }, disabled: false },
				{ itemID: 1, itemBrandID: 1, partNumber: 1 }
			);

			let unitData = JSON.stringify(unitList);
			let brandData = JSON.stringify(brandList);
			let supplierData = JSON.stringify(supplierList);
			let vehicleData = JSON.stringify(vehicleList);
			let itemData = JSON.stringify(itemList);
			let itemBrandData = JSON.stringify(itemBrandList);

			return {
				props: {
					currentUser,
					unitData,
					brandData,
					supplierData,
					vehicleData,
					itemData,
					itemBrandData,
				},
			};
		} else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);

function Inventory({
	currentUser,
	unitData,
	brandData,
	supplierData,
	vehicleData,
	itemData,
	itemBrandData,
}) {
	const units = JSON.parse(unitData);
	const brands = JSON.parse(brandData);
	const suppliers = JSON.parse(supplierData);
	const vehicles = JSON.parse(vehicleData);
	const items = JSON.parse(itemData);
	const itemBrands = JSON.parse(itemBrandData);

	const [isDisabled, setIsDisabled] = useState(false);
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<>
			<Header page={"INVENTORY"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<div className="main-container-bg">
					<br />
					<div className="App">
						<div className="bloc-tabs">
							<button
								className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
								onClick={() => toggleTab(1)}
							>
								ADD
							</button>
							<button
								className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
								onClick={() => toggleTab(2)}
							>
								PULL-OUT
							</button>
						</div>

						<div
							className={
								toggleState === 1 ? "content  active-content" : "content"
							}
						>
							<AddInventoryCreate
								units={units}
								brands={brands}
								suppliers={suppliers}
							></AddInventoryCreate>
						</div>

						<div
							className={
								toggleState === 2 ? "content  active-content" : "content"
							}
						>
							<PullInventoryCreate
								currentUser={currentUser}
								unitData={units}
								brandData={brands}
								supplierData={suppliers}
								vehicleData={vehicles}
								itemData={items}
								itemBrandData={itemBrands}
							>
								{" "}
							</PullInventoryCreate>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Inventory;
