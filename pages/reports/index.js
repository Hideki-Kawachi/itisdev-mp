import { withIronSessionSsr } from "iron-session/next";
import React, {useMemo} from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { BasicTable } from "../../components/Reports/BasicTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";
import { COLUMNS } from "../../components/Reports/AddColumns";
import ADDINV_MOCK_DATA from "../../components/Reports/ADD_INV.json";
import dbConnect from "../../lib/dbConnect";


import AddInventory from "../../models/AddInvSchema";

// import Item from "../../models/ItemSchema";
import Item from "../../models/ItemSchema";
import Measure from "../../models/MeasureSchema";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			if (currentUser.roleID === "0002") {
				//if user is only an employee
				return {
					redirect: { destination: "/vehicles", permanent: true },
					props: {},
				};
			} else {

				await dbConnect();


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

				var tempAddData = [];

				addRecList.forEach((addRec) => {
					let isFound = false;
					let isFound2 = false;
					let itemName = "";
					let unitType= "";
					
					while (!isFound && !isFound2) {

						itemList.forEach((item) => {
							if (addRec.itemID == item.itemID) {
								itemName = item.itemName;
								isFound = true;
							}
						});

						measureList.forEach((measure) => {
							if (addRec.unitID == measure.unitName) {
								unitType= measure.unitTypeName;
								isFound2 = true;
							} 
						});

					}

					tempAddData.push({
						//date, invoice,  item n, item model, quantity, unit name
						acquireDate: addRecList.acquireDate,
						invoiceNumber: addRecList.invoiceNumber,
						itemName: itemName,
						itemModel: addRecList.itemModel,
						quantity: addRecList.quantity,
						unit: unitType
					});


				});

				let addRecData = JSON.stringify(tempAddData);

				return { props: { currentUser, addRecData } }; 
				// return { props: { currentUser } }; //need to edit once done


			
			} 
		}else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);

// const tab = [
// 	{
// 		tab: 1
// 	}
// ];

function TransactionReports({ currentUser, addRecData}) {
	let ADDDATA = JSON.parse(addRecData);

	return (
		<>
			<Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<ReportTabs tab="1" roleID={currentUser.roleID}></ReportTabs>
				<BasicTable COLUMNS={COLUMNS} ADDINV={ADDDATA}></BasicTable>
			</div>
		</>
	);
}

export default TransactionReports;
