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
	return (
		<>
			<Header page={"DASHBOARD"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<p>dashboard</p>
			</div>
		</>
	);
};

/* Retrieves pet(s) data from mongodb database */
// export async function getServerSideProps() {

// 	await dbConnect();

// 	/* find all the data in our database */
// 	const result = await Pet.find({});
// 	const pets = result.map((doc) => {
// 		const pet = doc.toObject();
// 		pet._id = pet._id.toString();
// 		return pet;
// 	});

// 	return { props: { pets: pets } };
// }

export default Index;
