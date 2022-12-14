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
import unitType from "../../models/UnitTypeSchema";
import Item from "../../models/ItemSchema";

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

        const pullRecList = await PullInventory.find({},
        	{
        		lessRecordID: 1,
        		pullDate: 1,
        		plateNum: 1,
        	}
        	);
        const recordList = await RecordDetails.find({},
        	{
        		lessRecordID: 1,
        		itemID: 1,
        		quantity: 1,
        		unitID: 1,
        	}
        	);

        const itemList = await Item.find({},
        	{
        		itemID: 1,
        		itemName: 1,
        		itemModel: 1,
        	}
        );

        const unitTypeList = await unitType.find({},
        	{
        		UnitTypeID: 1,
        		UnitTypeName: 1,
        		disabled: 1,
        	})

        var tempPullData = [];

        // pullRecList.forEach((pullRec) => {
        //   let isFound = false;
        //   let isFound2 = false;
        //   let isFound3 = false;
        //   let tempItemName = "";
        //   let tempItemModel = "";
        //   let unitTypeName = "";
        //   let tempQuantity = "";

        //   while (!isFound && !isFound2 && !isFound3) {
        //     recordList.forEach((record) => {
        //       if (pullRec.lessRecordID == record.lessRecordID) {
        //         tempQuantity = record.quantity;
        //         itemList.forEach((item) => {
        //           if ((record.itemID = item.itemID)) {
        //             tempItemName = item.itemName;
        //             tempItemModel = item.itemModel;
        //             isFound = true;
        //           }
        //         });

        //         unitTypeList.forEach((unit) => {
        //           if (record.unitID == unit.UnitTypeID) {
        //             unitTypeName = unit.unitTypeName;
        //             isFound2 = true;
        //           }
        //         });
        //         isFound3 = true;
        //       }
        //     });
        //   }
        //   tempPullData.push({
        //     pulloutDate: pullRecList.pullDate,
        //     plateNum: pullRecList.plateNum,
        //     itemName: tempItemName,
        //     itemModel: tempItemModel,
        //     quantity: tempQuantity,
        //     unit: unitTypeName,
        //   });
        // });
        // let pullRecData = JSON.stringify(tempPullData);
        // return { props: { currentUser, pullRecData } };
       return { props: { currentUser } };
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


function PullOutReports({ currentUser }) {
	return (
		<>
			<Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<ReportTabs tab="2" roleID={currentUser.roleID}></ReportTabs>

				<BasicTable COLUMNS={COLUMNS} ADDINV={ADDINV_MOCK_DATA}></BasicTable>
			</div>
		</>
	);
}

export default PullOutReports;
