import React from "react";
import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import dbConnect from "../../lib/dbConnect";
import ItemBrand from "../../models/ItemBrandSchema";
import Supplier from "../../models/SupplierSchema";
import AddInventoryCreate from "../../components/Inventory/AddInventoryCreate";
import PullInventoryCreate from "../../components/Inventory/PullInventoryCreate";
import Vehicles from "../../models/VehicleSchema";
import Item from "../../models/ItemSchema";
import ItemBrandCombination from "../../models/ItemBrandCombinationSchema";
import Measure from "../../models/MeasureSchema";
import PullInventory from "../../models/PullInvSchema";
import RecordDetails from "../../models/RecordDetailsSchema";
import dayjs from "dayjs";
import AddInvSchema from "../../models/AddInvSchema";

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
					disabled: 1,
				}
			);

			const unitList = await Measure.find({ disabled: false });

			const brandList = await ItemBrand.find(
				{ disabled: false },
				{ itemBrandID: 1, name: 1 }
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

			const pullList = await PullInventory.find({ disabled: false });
			const recordList = await RecordDetails.find({});

			let InvAddData = JSON.stringify(InvAddList);
			let unitData = JSON.stringify(unitList);
			let brandData = JSON.stringify(brandList);
			let supplierData = JSON.stringify(supplierList);
			let vehicleData = JSON.stringify(vehicleList);
			let itemData = JSON.stringify(itemList);
			let itemBrandData = JSON.stringify(itemBrandList);
			let pullData = "";
			let pullTable = [];
			let pullTableData;
			if (pullList) {
				pullData = JSON.stringify(pullList);
				pullList.forEach((pull) => {
					let index = recordList.length - 1;
					let item = "";
					let brand = "";
					let quantity = 0;
					let unit = "";

					let itemName = "";
					let brandName = "";
					let unitName = "";

					while (index >= 0) {
						if (pull.lessRecordID == recordList[index].lessRecordID) {
							item = recordList[index].itemID;
							brand = recordList[index].brandID;
							quantity = recordList[index].quantity;
							unit = recordList[index].unitID;
							if (item.length > 0) {
								let isFound2 = false;
								let index2 = itemList.length - 1;
								while (!isFound2 && index2 >= 0) {
									if (item == itemList[index2].itemID) {
										isFound2 = true;
										itemName = itemList[index2].itemName;
									}
									index2--;
								}
								isFound2 = false;
								index2 = brandList.length - 1;
								while (!isFound2 && index2 >= 0) {
									if (brand == brandList[index2].itemBrandID) {
										isFound2 = true;
										brandName = brandList[index2].name;
									}
									index2--;
								}
								isFound2 = false;
								index2 = unitList.length - 1;
								while (!isFound2 && index2 >= 0) {
									if (unit == unitList[index2].unitID) {
										isFound2 = true;
										unitName = unitList[index2].unitName;
									}
									index2--;
								}
							}

							pullTable.push({
								pullDate: dayjs(pull.pullDate).format("MM/DD/YYYY"),
								JOnumber: pull.JOnumber,
								plateNum: pull.plateNum,
								itemName: itemName,
								brandName: brandName,
								quantity: quantity,
								unit: unitName,
							});
						}
						index--;
					}
				});

				pullTable.sort((a, b) => {
					return new Date(b.pullDate) - new Date(a.pullDate);
				});
				pullTableData = JSON.stringify(pullTable);
			} else {
				pullData = JSON.stringify({});
				pullTableData = JSON.stringify({});
			}

			return {
				props: {
					currentUser,
					unitData,
					brandData,
					supplierData,
					vehicleData,
					itemData,
					itemBrandData,
					pullData,
					pullTableData,
					InvAddData,
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
	pullData,
	pullTableData,
	InvAddData,
}) {
	const inventories = JSON.parse(InvAddData);
	const units = JSON.parse(unitData);
	const brands = JSON.parse(brandData);
	const suppliers = JSON.parse(supplierData);
	const vehicles = JSON.parse(vehicleData);
	const items = JSON.parse(itemData);
	const itemBrands = JSON.parse(itemBrandData);
	const pullInv = JSON.parse(pullData);
	const pullTable = JSON.parse(pullTableData);

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
								inventories={inventories}
								units={units}
								brands={brands}
								suppliers={suppliers}
								items={items}
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
								pullData={pullInv}
								pullTableData={pullTable}
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
