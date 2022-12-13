import React, {useMemo} from "react";
import { Router, useRouter } from "next/router";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import dbConnect from "../../lib/dbConnect";
import Item from "../../models/ItemSchema";
import ItemCategory from "../../models/ItemCategorySchema"
import ItemBrand from "../../models/ItemBrandSchema";
import ItemTable from "../../components/Items/ItemTable";
import ItemEdit from "../../components/Items/ItemEdit";

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
					brandCombination: 1, 
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
			// const unitList = await .find(
			// 	{},
			// 	{
					
			// 	}
			// )
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

			return { props: { 
				currentUser,
				itemData,
				categoryData,
				brandData, 
			} };
		} else {
			return {
				redirect: { destination: "/signin", permanent: true },
				props: {},
			};
		}
	},
	ironOptions
);

function ItemDetails({currentUser, itemData, categoryData, brandData}) {
    const router = useRouter();
    const itemID = router.query.itemID;

    const items = JSON.parse(itemData);
	const categories = JSON.parse(categoryData);
    const brands = JSON.parse(brandData);

    return (
        <>
            <Header
				page={"ITEMS"}
				subPage={"EDIT ITEM"}
				user={currentUser}
			></Header>
			<NavBar user={currentUser}></NavBar>
			<br />
			<div id="main-container">
				<>
                    <ItemEdit 
                        itemID={itemID}
                        items={items}
                        categories={categories}
                        brands={brands}
					>
                    </ItemEdit>
				</>
			</div>
        </>
    )
}

export default ItemDetails;