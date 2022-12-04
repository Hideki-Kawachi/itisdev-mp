import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { ironOptions } from "../../lib/config";
import ReportTabs from "./ReportTabs";

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

function Reports({ currentUser }) {
	return (
		<>
			<Header page={"REPORTS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<p>reports</p>
				<ReportTabs></ReportTabs>
			</div>
		</>
	);
}

export default Reports;
