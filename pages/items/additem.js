import React, { useState } from "react";

import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import BasicButton from "../../components/BasicButton";

import ItemCreate from "../../components/Items/ItemCreate";
import AddItemCategory from "../../components/Items/CategoryCreate";
import ItemTable from "../../components/Items/ItemTable";
import { ironOptions } from "../../lib/config";
import { withIronSessionSsr } from "iron-session/next";

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
	const [categoryPopupOn, setCategoryPopupOn] = useState(false);
	const [brandPopupOn, setBrandPopupOn] = useState(false);
	const [unitPopupOn, setUnitPopupOn] = useState(false);

	return (
		<>
			<Header page={"ITEMS"} subPage={"ADD ITEM"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				{categoryPopupOn ? (
					<>
						<div className="item-modal-bg">
							<AddItemCategory
								trigger={categoryPopupOn}
								setTrigger={setCategoryPopupOn}
							></AddItemCategory>
						</div>
						<ItemCreate
							trigger={categoryPopupOn}
							setTrigger={setCategoryPopupOn}
						/>
					</>
				) : (
					<div className="main-container-bg">
						<ItemCreate
							trigger={categoryPopupOn}
							setTrigger={setCategoryPopupOn}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Items;
