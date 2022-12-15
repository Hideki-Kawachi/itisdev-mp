import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { DashboardTable } from "../components/DashboardTable";
import { ironOptions } from "../lib/config";
import dbConnect from "../lib/dbConnect";
import User from "../models/UserSchema";
import Vehicle from "../models/VehicleSchema";
import { COLUMNS } from "../components/Dashboard/TransactionColumns";
import ADDINV_MOCK_DATA from "../components/Reports/ADD_INV.json";
import PullInventory from "../models/PullInvSchema";
import AddInventory from "../models/AddInvSchema";
import RecordDetails from "../models/RecordDetailsSchema";
import ItemBrand from "../models/ItemBrandSchema";
import Measure from "../models/MeasureSchema";
import Item from "../models/ItemSchema";
import dayjs from "dayjs";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			if (currentUser.roleID === "0002") {
				//if employee
				return {
					redirect: { destination: "/vehicles", permanent: true },
					props: {},
				};
			} else {
				await dbConnect();
				const totalUsers = await User.countDocuments({ disabled: false });
				const totalVehicles = await Vehicle.countDocuments({ disabled: false });
				const pullList = await PullInventory.find({ disabled: false });
				const recordList = await RecordDetails.find({});

				//Start here
				const addRecList = await AddInventory.find(
					{},
					//date, invoice,  item, item model, quantity, unit
					{
						addRecordID: 1,
						acquireDate: 1,
						invoiceNumber: 1,
						itemID: 1,
						quantity: 1,
						unitID: 1,
					}
				);

				const itemList = await Item.find(
					{},
					{
						itemID: 1,
						itemName: 1,
						itemModel: 1,
						unitID: 1,
						quantity: 1,
						minQuantity: 1,
					}
				);

				const measureList = await Measure.find(
					{},
					{
						unitID: 1,
						unitName: 1,
					}
				);

				const brandList = await ItemBrand.find({ itemBrandID: 1, name: 1 });

				var tempRepData = [];

				addRecList.forEach((addRec) => {
					let isFound = false;
					let isFound2 = false;
					let itemName = "";
					let itemModel = "";
					let unitType = "";

					while (!isFound && !isFound2) {
						itemList.forEach((item) => {
							if (addRec.itemID == item.itemID) {
								itemName = item.itemName;
								itemModel = item.itemModel;
								isFound = true;
							}
						});

						measureList.forEach((measure) => {
							if (addRec.unitID == measure.unitID) {
								unitType = measure.unitName;
								isFound2 = true;
							}
						});
					}

					tempRepData.push({
						//date, invoice,  item n, item model, quantity, unit name
						transactionDate: dayjs(addRec.acquireDate).format("MM/DD/YYYY"),
						itemName: itemName,
						itemModel: itemModel,
						quantity: addRec.quantity,
						unit: unitType,
						transactType: "Add",
					});

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
							let itemModel = "";
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
												itemModel = itemList[index2].itemModel;
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
										index2 = measureList.length - 1;
										while (!isFound2 && index2 >= 0) {
											if (unit == measureList[index2].unitID) {
												isFound2 = true;
												unitName = measureList[index2].unitName;
											}
											index2--;
										}
									}

									tempRepData.push({
										transactionDate: dayjs(pull.pullDate).format("MM/DD/YYYY"),
										itemName: itemName,
										itemModel: itemModel,
										itemName: itemName,
										quantity: quantity,
										unit: unitName,
										transactType: "Pull",
									});
								}
								index--;
							}
						});
						pullTableData = JSON.stringify(pullTable);
					} else {
						pullData = JSON.stringify({});
						pullTableData = JSON.stringify({});
					}
				});

				let lastMonth = new Date();
				lastMonth.setMonth(lastMonth.getMonth() - 1);
				lastMonth.setHours(0, 0, 0, 0);

				let inFlow = tempRepData.filter(
					(curr) =>
						new Date(curr.transactionDate) > lastMonth &&
						curr.transactType == "Add"
				).length;

				let outFlow = tempRepData.filter(
					(curr) =>
						new Date(curr.transactionDate) > lastMonth &&
						curr.transactType == "Pull"
				).length;

				let tempStock = [];

				itemList.forEach((item) => {
					if (item.quantity <= item.minQuantity) {
						tempStock.push({
							itemName: item.itemName,
							itemModel: item.itemModel,
							reorder: item.minQuantity,
							quantity: item.quantity,
						});
					}
				});

				let lowStock = JSON.stringify(tempStock);

				return {
					props: {
						currentUser,
						totalUsers,
						totalVehicles,
						tempRepData,
						inFlow,
						outFlow,
						lowStock,
					},
				};
			}
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

const Index = ({
	currentUser,
	totalUsers,
	totalVehicles,
	tempRepData,
	lowStock,
	inFlow,
	outFlow,
}) => {
	const lowStockList = JSON.parse(lowStock);

	return (
		<>
			<Header page={"DASHBOARD"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container" className="dashboard-main-container">
				<div className="dashboard-left-container">
					<div className="dashboard-top-container">
						<div className="dashboard-gray-containers">
							<h1>Total Users</h1>
							<span>{totalUsers}</span>
						</div>
						<div className="dashboard-gray-containers">
							<h1>Total Vehicles</h1>
							<span>{totalVehicles}</span>
						</div>
						<div className="dashboard-gray-containers">
							<h1>In-Flow: Past 30 Days</h1>
							<span>{inFlow}</span>
						</div>
					</div>
					<div className="dashboard-table-container">
						<h1>Recent Inventory Records</h1>
						<DashboardTable
							COLUMNS={COLUMNS}
							ADDINV={tempRepData}
						></DashboardTable>
					</div>
				</div>
				<div className="dashboard-right-container">
					<div className="dashboard-gray-containers">
						<h1>Out-Flow: Past 30 Days</h1>
						<span>{outFlow}</span>
					</div>
					<div className="dashboard-stock-container">
						<h1>Low Stock</h1>
						<div className="stock-container-header">
							<span>Item</span>
							<span className="stock-left-text">Reorder &nbsp; Count</span>
						</div>
						<div className="dashboard-card-list-container">
							{lowStockList.map((lowStock, index) => (
								<DashboardCard
									key={index}
									itemName={lowStock.itemName}
									itemModel={lowStock.itemModel}
									reorder={lowStock.reorder}
									quantity={lowStock.quantity}
								></DashboardCard>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
