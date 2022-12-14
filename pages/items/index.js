import React, { useMemo } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import dbConnect from "../../lib/dbConnect";
import Item from "../../models/ItemSchema";
import ItemCategory from "../../models/ItemCategorySchema";
import ItemBrand from "../../models/ItemBrandSchema";
import Measure from "../../models/MeasureSchema";
import ItemTable from "../../components/Items/ItemTable";
import { ironOptions } from "../../lib/config";
import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		if (req.session.user) {
			let currentUser = req.session.user;
			await dbConnect();

			const itemList = await Item.find(
				{},
				{
					itemID: 1,
					categoryID: 1,
					itemName: 1,
					itemModel: 1,
					unitID: 1,
					quantity: 1,
					minQuantity: 1,
					disabled: 1,
				}
			);
			const categoryList = await ItemCategory.find(
				{},
				{
					categoryID: 1,
					name: 1,
					disabled: 1,
				}
			);
			const unitList = await Measure.find(
				{},
				{
					unitID: 1,
					unitName: 1,
					abbreviation: 1,
					unitTypeID: 1,
					// classTypeID: 1,
					disabled: 1,
				}
			);
			const brandList = await ItemBrand.find(
				{},
				{
					itemBrandID: 1,
					name: 1,
					disabled: 1,
				}
			);

			let itemData = JSON.stringify(itemList);
			let categoryData = JSON.stringify(categoryList);
			let brandData = JSON.stringify(brandList);
			let unitData = JSON.stringify(unitList);

			return {
				props: {
					currentUser,
					itemData,
					categoryData,
					brandData,
					unitData,
				},
			};
		} else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);

function Items({ currentUser, itemData, categoryData, unitData }) {
	const items = JSON.parse(itemData);
	const categories = JSON.parse(categoryData);
	const units = JSON.parse(unitData);

	// Convert category ID to its name
	useMemo(() => {
		items.forEach((item) => {
			categories.forEach((category) => {
				if (item.categoryID == category.categoryID) {
					item.categoryID = category.name;
				}
			});
			units.forEach((unit) => {
				if (item.unitID == unit.unitID) {
					item.unitID = unit.unitName;
				}
			});
		});
	}, []);

	return (
		<>
			<Header page={"ITEMS"} subPage={"HOME"} user={currentUser}></Header>
			<NavBar user={currentUser}></NavBar>
			<div id="main-container">
				<div className="main-container-bg">
					<br />
					<ItemTable
						itemData={items}
						categoryData={categories}
						unitData={units}
					></ItemTable>
				</div>
			</div>
		</>
	);
}

export default Items;
