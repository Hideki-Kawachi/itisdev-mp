import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { BasicTable } from "../components/Reports/BasicTable";
import { ironOptions } from "../lib/config";
import dbConnect from "../lib/dbConnect";
import User from "../models/UserSchema";
import Vehicle from "../models/VehicleSchema";
import { COLUMNS } from "../components/Dashboard/TransactionColumns";

import AddInventory from "../models/AddInvSchema";
import Item from "../models/ItemSchema";
import Measure from "../models/MeasureSchema";
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


				//Start here
				const addRecList = await AddInventory.find(
					{},
					//date, invoice,  item, item model, quantity, unit
					{	
						addRecordID: 1, 
						acquireDate: 1, 
						invoiceNumber: 1, 
						itemID: 1, 
						quantity:1, 
						unitID: 1 
					}
				);

				const itemList = await Item.find(
					{},
					{
						itemID: 1,
						itemName: 1,
						itemModel: 1,
						unitID: 1
					}
				);

				const measureList = await Measure.find(
						{},
						{
							unitID: 1,
							unitName: 1
						}
				);

				var tempRepData = [];

				addRecList.forEach((addRec) => {
					let isFound = false;
					let isFound2 = false;
					let itemName = "";
					let itemModel = "";
					let unitType= "";
					
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
								unitType= measure.unitName;
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
						transactType: "Add"
					});


				});



				return { props: { currentUser, totalUsers, totalVehicles, tempRepData} };
			}
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

const Index = ({ currentUser, totalUsers, totalVehicles, tempRepData}) => {
	const inFlow = 45;
	const outFlow = 72;

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
						<BasicTable COLUMNS={COLUMNS} ADDINV={tempRepData}></BasicTable>
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
							<span>Count</span>
						</div>
						<div className="dashboard-card-list-container">
							<DashboardCard
								itemName={"oil filter"}
								itemModel={"#JC-721"}
								quantity={2}
							></DashboardCard>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
