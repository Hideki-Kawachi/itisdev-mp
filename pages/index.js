import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { ironOptions } from "../lib/config";
import dbConnect from "../lib/dbConnect";
import User from "../models/UserSchema";
import Vehicle from "../models/VehicleSchema";

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
				await dbConnect();
				const totalUsers = await User.countDocuments({ disabled: false });
				const totalVehicles = await Vehicle.countDocuments({ disabled: false });
				const 

				return { props: { currentUser, totalUsers, totalVehicles } };
			}
		}

		return {
			redirect: { destination: "/signin", permanent: true },
			props: {},
		};
	},
	ironOptions
);

const Index = ({ currentUser, totalUsers, totalVehicles }) => {
	const inFlow = 45;
	const outFlow = 72;

	return (
		<>
			<Header page={"DASHBOARD"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container" className="dashboard-main-container">
				<div className="dashboard-left-container">
					<div className="dashboard-top-container">
						<div className="dashboard-gray-containers">
							<h1>Total Users</h1>
							<span>{totalUsers}</span>
						</div>
						<div className="dashboard-gray-containers">
							<h1>Total Vehicles</h1>
							<span>{totalVehicles}</span>
						</div>
						<div className="dashboard-gray-containers">
							<h1>In-Flow: Past 30 Days</h1>
							<span>{inFlow}</span>
						</div>
					</div>
					<div className="dashboard-table-container">
						<h1>Recent Inventory Records</h1>
					</div>
				</div>
				<div className="dashboard-right-container">
					<div className="dashboard-gray-containers">
						<h1>Out-Flow: Past 30 Days</h1>
						<span>{outFlow}</span>
					</div>
					<div className="dashboard-stock-container">
						<h1>Low Stock</h1>
						<div className="stock-container-header">
							<span>Item</span>
							<span>Count</span>
						</div>
						<div className="dashboard-card-list-container">
							<DashboardCard
								itemName={"oil filter"}
								itemModel={"#JC-721"}
								quantity={2}
							></DashboardCard>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
