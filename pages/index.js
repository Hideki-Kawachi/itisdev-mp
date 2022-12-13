import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { ironOptions } from "../lib/config";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			if (currentUser.roleID === "0002") {
				//if employee
				return {
					redirect: { destination: "/vehicles", permanent: true },
					props: {},
				};
			} else {
				return { props: { currentUser } };
			}
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

const Index = ({ currentUser }) => {
	const totalUsers = 3;
	const totalVehicles = 35;
	const inFlow = 45;
	const outFlow = 72;

	return (
		<>
			<Header page={"DASHBOARD"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container" className="dashboard-main-container">
				<div className="dashboard-left-container">
					<div className="dashboard-top-container">
						<div>
							<h1>Total Users</h1>
							<span>{totalUsers}</span>
						</div>
						<div>
							<h1>Total Vehicles</h1>
							<span>{totalVehicles}</span>
						</div>
						<div>
							<h1>In-Flow: Past 30 Days</h1>
							<span>{inFlow}</span>
						</div>
					</div>
					<div className="dashboard-table-container">
						<h1>Recent Inventory Records</h1>
					</div>
				</div>
				<div className="dashboard-right-container">
					<div>
						<h1>Out-Flow: Past 30 Days</h1>
						<span>{outFlow}</span>
					</div>
					<div className="dashboard-stock-container">
						<h1>Low Stock</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
