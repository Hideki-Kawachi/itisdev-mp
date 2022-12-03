import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BasicButton from "../../components/BasicButton";
import ItemTable from "../../components/Items/ItemTable";
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

function Items({ currentUser }) {
	const router = useRouter();
	return (
		<>
			<Header page={"ITEMS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<div className="main-container-bg">
					<ItemTable></ItemTable>
				</div>
			</div>
		</>
	);
}

export default Items;
