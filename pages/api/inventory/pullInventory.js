import dbConnect from "../../../lib/dbConnect";
import PullInventorySchema from "../../../models/PullInvSchema";

export default async (req, res) => {
	await dbConnect();

	const pullInvInfo = req.body;
	console.log("pull inv", pullInvInfo);

	let invalidRecordID = await PullInventorySchema.findOne({
		lessRecordID: pullInvInfo.lessRecordID,
	});

	if (invalidRecordID != null) {
		console.log("INVALID");
		res.json(pullInvInfo.lessRecordID);
	} else {
		await PullInventorySchema.create(pullInvInfo);
		res.json("Pulled Inventory");
	}
};
