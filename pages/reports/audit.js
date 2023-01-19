import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { BasicTable } from "../../components/Reports/BasicTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";
import { COLUMNS } from "../../components/Reports/AuditColumns";

import Item from "../../models/ItemSchema";
import Measure from "../../models/MeasureSchema";
import User from "../../models/UserSchema";
import Audit from "../../models/AuditSchema";

import dbConnect from "../../lib/dbConnect";
import dayjs from "dayjs";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			if (currentUser.roleID === "0002" || currentUser.roleID === "0001") {
				//if user is only an employee
				return {
					redirect: { destination: "/reports", permanent: true },
					props: {},
				};
			} else {
				await dbConnect();

				const measureList = await Measure.find({});

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

				const userList = await User.find({});

				const auditList = await Audit.find({});

				// Item: itemName, itemModel
				// user: UserID for creatorID - kunin yung name
				// Unit: Measure (connect sa itemS)

				var tempAuditData = [];

				auditList.forEach((audit) => {
					let isFound = false;
					let isFound2 = false;
					let isFound3 = false;

					//Item
					let itemName = "";
					let itemModel = "";
					let systemCount = audit.systemCount;
					let physicalCount = audit.physicalCount;

					//Measure
					let unitType = "";

					//User
					let name = "";

					while (!isFound && !isFound2 && !isFound3) {
						itemList.forEach((item) => {
							if (audit.itemID == item.itemID) {
								itemName = item.itemName;
								itemModel = item.itemModel;
								isFound = true;
							}
							measureList.forEach((measure) => {
								if (item.unitID == measure.unitID) {
									unitType = measure.unitName;
									isFound2 = true;
								}
							});
						});

						userList.forEach((user) => {
							if (audit.creatorID == user.userID) {
								name = user.firstName + " " + user.lastName;
								isFound3 = true;
							}
						});
					}

					tempAuditData.push({
						//date, invoice,  item n, item model, quantity, unit name
						auditDate: dayjs(audit.auditDate).format("MM/DD/YYYY"),
						itemName: itemName,
						itemModel: itemModel,
						systemCount: systemCount,
						physicalCount: physicalCount,
						unit: unitType,
						creatorID: name,
					});
				});

				let auditData = JSON.stringify(tempAuditData);

				return { props: { currentUser, auditData } };
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

// const tab = [
// 	{
// 		tab: 1
// 	}
// ];

function AuditReports({ currentUser, auditData }) {
	let TEMPDATA = JSON.parse(auditData);

	return (
		<>
			<Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<ReportTabs tab="4" roleID={currentUser.roleID}></ReportTabs>
				<BasicTable COLUMNS={COLUMNS} ADDINV={TEMPDATA}></BasicTable>
			</div>
		</>
	);
}

export default AuditReports;
