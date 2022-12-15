import dbConnect from "../../../lib/dbConnect";
import AddInventory from "../../../models/AddInvSchema";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema";
import Item from "../../../models/ItemSchema";

export default async (req, res) => {
	await dbConnect();

	const addInvInfo = req.body;
	console.log(addInvInfo);
	let invalidRecordID = await AddInventory.findOne({
		addRecordID: addInvInfo.addRecordID,
	});

	if (invalidRecordID != null) {
		console.log("INVALID");
		res.json(addInvInfo.addRecordID);
	} else {
		await AddInventory.create(addInvInfo);
		await Item.updateOne(
			{ itemID: addInvInfo.itemID },
			{ $inc: { quantity: addInvInfo.quantity } }
		);
		await ItemBrandCombination.updateOne(
			{ itemID: addInvInfo.itemID, brandID: addInvInfo.brandID },
			{ $inc: { quantity: addInvInfo.quantity } }
		);
		res.json("Added Inventory");
	}
};
