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
import ItemBrand from "../../models/ItemBrandSchema";
import Supplier from "../../models/SupplierSchema";
import AddInventoryCreate from "../../components/Inventory/AddInventoryCreate";
import PullInventoryCreate from "../../components/Inventory/PullInventoryCreate";
import AddInvSchema from "../../models/AddInvSchema";
import Item from "../../models/ItemSchema";


export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			await dbConnect();

			const InvAddList = await AddInvSchema.find(
				{},
				{
					addRecordID: 1,
					invoiceNumber: 1,
					partNumber: 1,
					supplierID: 1,
					brandID: 1,
					itemID: 1,
					quantity: 1,
					unitID: 1,
					unitPrice: 1,
					acquireDate: 1,
					remarks: 1,
					creatorID: 1,
					editorID: 1,
					editDate: 1,
					itemModel: 1,
					disabled: 1
				}
			);

			const unitList = await unitType.find(
				{},
				{ UnitTypeID: 1, UnitTypeName: 1, disabled: 1 }
			);

			const brandList = await ItemBrand.find(
				{},
				{ itemBrandID: 1, name: 1, disabled: 1 }
			);

			const itemList = await Item.find(
				{},
				{ itemID: 1, itemName: 1, disabled: 1}
			);

			const supplierList = await Supplier.find(
				{},
				{ supplierID: 1, supplierName: 1, disabled: 1}
			);

			let InvAddData = JSON.stringify(InvAddList)
			let unitData = JSON.stringify(unitList);
			let brandData = JSON.stringify(brandList);
			let itemData = JSON.stringify(itemList);
			let supplierData = JSON.stringify(supplierList);

			return {
				props: {
					InvAddData,
					currentUser,
					unitData,
					brandData,
					itemData,
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

function Inventory({ InvAddData, unitData, brandData, itemData, supplierData, currentUser }) {
	const inventories = JSON.parse(InvAddData);
	const units = JSON.parse(unitData);
	const brands = JSON.parse(brandData);
	const items = JSON.parse(itemData);
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
							inventories={inventories}
							units={units}
							brands={brands}
							items={items}
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
