import dbConnect from "../../../lib/dbConnect";
import AddInventory from "../../../models/AddInvSchema";

export default async (req, res) => {
	await dbConnect();

	const addInvInfo = req.body;

	let invalidRecordID = await AddInventory.findOne({ addRecordID: addInvInfo.addRecordID });

	if (invalidRecordID != null) {
		console.log("INVALID");
		res.json(addInvInfo.addRecordID);
	} else {
		await AddInventory.create(addInvInfo);
		res.json("Added Inventory");
	}
};
