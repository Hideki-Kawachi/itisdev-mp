import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { AuditTable } from "../../components/Audit/AuditTable";
import { ironOptions } from "../../lib/config";
import AuditTabs from "../../components/Audit/AuditTabs";

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

function TransactionReports({ currentUser }) {
  return (
    <>
      <Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
      <NavBar user={currentUser}></NavBar>
      <div id="main-container">
        <AuditTabs tab="1"></AuditTabs>
        <AuditTable></AuditTable>
      </div>
    </>
  );
}

export default TransactionReports;
