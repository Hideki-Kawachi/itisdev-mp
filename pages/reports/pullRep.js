import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { BasicTable } from "../../components/Reports/BasicTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";
import { COLUMNS } from "../../components/Reports/PullColumns";
import dbConnect from "../../lib/dbConnect";
import ADDINV_MOCK_DATA from "../../components/reports/PULL_INV.json";
import PullInventory from "../../models/PullInvSchema";
import RecordDetails from "../../models/RecordDetailsSchema";
//import unitType from "../../models/UnitTypeSchema";
import Item from "../../models/ItemSchema";
import Measure from "../../models/MeasureSchema";
import ItemBrand from "../../models/ItemBrandSchema";
import ItemBrandCombination from "../../models/ItemBrandCombinationSchema";
import dayjs from "dayjs";
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
			{ itemBrandID: 1, name: 1 }
			);


			const itemList = await Item.find(
			{ itemID: 1, itemName: 1, itemModel: 1, unitID: 1, quantity: 1, minQuantity: 1 }
			);

			const itemBrandList = await ItemBrandCombination.find(
			{ itemID: 1, itemBrandID: 1, partNumber: 1 }
			);

			const pullList = await PullInventory.find({ disabled: false });
			const recordList = await RecordDetails.find({});

			let unitData = JSON.stringify(unitList);
			let itemData = JSON.stringify(itemList);
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
					itemModel: itemModel,
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
			pullTableData = JSON.stringify(pullTable);
			} else {
			pullData = JSON.stringify({});
			pullTableData = JSON.stringify({});
			}

			return {
			props: {
				currentUser,
				unitData,
				itemData,
				pullData,
				pullTableData,
			},
			};

      //  let pullRecData = JSON.stringify(tempPullData);
      }
		} else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);


function PullOutReports({ currentUser, pullTableData }) {
  let PULLDATA = JSON.parse(pullTableData);
  return (
    <>
      <Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
      <NavBar user={currentUser}></NavBar>
      <div id="main-container">
        <ReportTabs tab="2" roleID={currentUser.roleID}></ReportTabs>

        <BasicTable COLUMNS={COLUMNS} ADDINV={PULLDATA}></BasicTable>
      </div>
    </>
  );
}

export default PullOutReports;
