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
import RecordDetails from "../../models/RecordDetailsSchema";

// import unitType from "../../models/UnitTypeSchema";
// import Item from "../../models/ItemSchema";
import Item from "../../models/ItemSchema";
import Measure from "../../models/MeasureSchema";
import ItemBrand from "../../models/ItemBrandSchema";
import ItemBrandCombination from "../../models/ItemBrandCombinationSchema";

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

				const unitList = await Measure.find({ disabled: false });

				const brandList = await ItemBrand.find(
				{ disabled: false },
				{ itemBrandID: 1, name: 1 }
				);
	
	
				const itemList = await Item.find(
				{ quantity: { $gt: 0 }, disabled: false },
				{ itemID: 1, itemName: 1, itemModel: 1, unitID: 1, quantity: 1, minQuantity: 1 }
				);
	
				const itemBrandList = await ItemBrandCombination.find(
				{ quantity: { $gt: 0 }, disabled: false },
				{ itemID: 1, itemBrandID: 1, partNumber: 1 }
				);

				const addList = await AddInventory.find({ disabled: false });
				const recordList = await RecordDetails.find({});

				let unitData = JSON.stringify(unitList);
				let itemData = JSON.stringify(itemList);
				let addData = "";
				let addTable = [];
				let addTableData;

				if (addList) {
					addData = JSON.stringify(addList);
					addList.forEach((add) => { 
						let index = recordList.length - 1;
						let item = "";
						let brand = "";
						let quantity = 0;
						let unit = "";

						let itemName = "";
						let itemModel = "";
						let brandName = "";
						let unitName = "";

						// while (index >= 0) {

						// 	if (add.addRecordID == recordList[index].lessRecordID) {
						// 		item = recordList[index].itemID;
						// 		brand = recordList[index].brandID;
						// 		quantity = recordList[index].quantity;
						// 		unit = recordList[index].unitID;
					});
				
								


				//await dbConnect();

				// const addRecList = await AddInventory.find(
				// 	{},
				// 	//date, invoice,  item, item model, quantity, unit
				// 	{	
				// 		addRecordID: 1, 
				// 		acquireDate: 1, 
				// 		invoiceNumber: 1, 
				// 		itemID: 1, 
				// 		quantity:1, 
				// 		unitID: 1 
				// 	}
				// );

				// const itemList = await Item.find(
				// 	{},
				// 	{
				// 		itemID: 1,
				// 		itemName: 1,
				// 		itemModel: 1,
				// 	}
				// );

				// const unitTypeList = await unitType.find(
				// 		{},
				// 		{
				// 			UnitTypeID: 1,
				// 			UnitTypeName: 1,
				// 			disabled: 1,
				// 		}
				// );

				// var tempAddData = [];

				// addRecList.forEach((addRec) => {
				// 	let isFound = false;
				// 	let isFound2 = false;
				// 	let itemName = "";
				// 	let itemModel = "";
				// 	let unitTypeName = "";
					
				// 	while (!isFound && !isFound2) {

				// 		itemList.forEach((item) => {
				// 			if (addRec.itemID == item.itemID) {
				// 				itemName = item.itemName;
				// 				isFound = true;
				// 			}
				// 		});

				// 		unitTypeList.forEach((unitType) => {
				// 			if (addRec.unitID == unitType.UnitTypeID ) {
				// 				unitTypeName = unitType.UnitTypeName;
				// 				isFound2 = true;
				// 			} 
				// 		});

				// 	}

				// 	tempAddData.push({
				// 		//date, invoice,  item n, item model, quantity, unit name
				// 		acquireDate: addRecList.acquireDate,
				// 		invoiceNumber: addRecList.invoiceNumber,
				// 		itemName: itemName,
				// 		itemModel: addRecList.itemModel,
				// 		quantity: addRecList.quantity,
				// 		unit: unitTypeName
				// 	});


				// });

				// let addRecData = JSOn.stringify(tempAddData);

				// return { props: { currentUser, addRecData } }; 
				return { props: { currentUser } }; //need to edit once done


			
		} else {
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

function TransactionReports({ currentUser }) {

	return (
		<>
			<Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<ReportTabs tab="1" roleID={currentUser.roleID}></ReportTabs>
				<BasicTable COLUMNS={COLUMNS} ADDINV={ADDINV_MOCK_DATA}></BasicTable>
			</div>
		</>
	);
}

export default TransactionReports;
