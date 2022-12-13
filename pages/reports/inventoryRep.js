import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { BasicTable } from "../../components/Reports/BasicTable";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";
import { COLUMNS } from "../../components/Reports/PullColumns";
import ADDINV_MOCK_DATA from "../../components/reports/PULL_INV.json";

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
