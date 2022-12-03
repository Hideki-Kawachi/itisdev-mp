import React from "react";
import Link from "next/link";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import Tabs from "./Tabs";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/config";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			return { props: { currentUser } };
		} else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);

function Inventory({ currentUser }) {
	return (
		<>
			<Header page={"INVENTORY"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<div className="main-container-bg">
					<br />
					<div className="App">
						<Tabs />
					</div>
				</div>
			</div>
		</>
	);
}

export default Inventory;
