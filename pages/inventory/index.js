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


export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			await dbConnect();

			const unitList = await unitType.find(
				{},
				{ UnitTypeID: 1, UnitTypeName: 1, disabled: 1 }
			);

			const brandList = await Brand.find(
				{},
				{ brandID: 1, name: 1, disabled: 1 }
			);

			const supplierList = await Supplier.find(
				{},
				{ supplierID: 1, supplierName: 1, disabled: 1}
			);


			let unitData = JSON.stringify(unitList);
			let brandData = JSON.stringify(brandList);
			let supplierData = JSON.stringify(supplierList);

			return {
				props: {
					currentUser,
					unitData,
					brandData,
					supplierData,
				}
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

function Inventory({ unitData, brandData, supplierData, currentUser }) {
	const units = JSON.parse(unitData);
	const brands = JSON.parse(brandData);
	const suppliers = JSON.parse(supplierData);

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
							className={toggleState === 1 ? "content  active-content" : "content"}
						>
							<AddInventoryCreate
							units={units}
							brands={brands}
							suppliers={suppliers}
							></AddInventoryCreate>
						</div>

						<div
							className={toggleState === 2 ? "content  active-content" : "content"}
						>
							<PullInventoryCreate> </PullInventoryCreate>

						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Inventory;
