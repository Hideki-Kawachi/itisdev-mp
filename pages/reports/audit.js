import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { AuditTable } from "../../components/Reports/AuditTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user) {
      let currentUser = req.session.user;
      if (currentUser.roleID === "0002") {
        //if user is only an employee
        return {
          redirect: { destination: "/reports", permanent: true },
          props: {},
        };
      } else {
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
        <ReportTabs tab="5" ></ReportTabs>
        <AuditTable></AuditTable>
      </div>
    </>
  );
}

export default AuditReports;