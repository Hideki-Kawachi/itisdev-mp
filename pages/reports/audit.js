import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { BasicTable } from "../../components/Reports/BasicTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";
import { COLUMNS } from "../../components/Reports/AuditColumns";

import AUDIT_MOCK_DATA from "../../components/reports/AUDIT_MOCK_DATA.json";

import Item from "../../models/ItemSchema";
import Measure from "../../models/MeasureSchema";
import User from "../../models/UserSchema";
import Audit from "../../models/AuditSchema";



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

      const unitList = await Measure.find({});
      
      const itemList = await Item.find(
        {},
        { itemID: 1, itemName: 1, itemModel: 1, unitID: 1, quantity: 1, minQuantity: 1 }
			);

      const userList = await User.find({});
      
      const auditList = await Audit.find({});
      
      
      


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

// const tab = [
// 	{
// 		tab: 1
// 	}
// ];

function AuditReports({ currentUser }) {
  return (
    <>
      <Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
      <NavBar user={currentUser}></NavBar>
      <div id="main-container">
        <ReportTabs tab="4" roleID={currentUser.roleID}></ReportTabs>
        <BasicTable COLUMNS={COLUMNS} ADDINV={AUDIT_MOCK_DATA}></BasicTable>
      </div>
    </>
  );
}

export default AuditReports;