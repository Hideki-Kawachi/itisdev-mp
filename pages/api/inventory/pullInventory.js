import dbConnect from "../../../lib/dbConnect";
import PullInventory from "../../../models/PullInvSchema";
import RecordDetails from "../../../models/RecordDetailsSchema";

export default async (req, res) => {
	await dbConnect();

	const pullData = req.body.pullInvData;
	const records = req.body.detailsArray;

	console.log("DATA:", pullData);
	console.log("RECORDS:", records);

	let pull = await PullInventory.create({
		lessRecordID: pullData.lessRecordID,
		pullDate: pullData.pullDate,
		JOnumber: pullData.JOnumber,
		plateNum: pullData.plateNum,
		mechanicName: pullData.mechanicName,
		remarks: pullData.remarks,
		creatorID: pullData.creatorID,
		creationDate: pullData.creationDate,
		editorID: pullData.editorID,
		editDate: pullData.editDate,
		disabled: pullData.disabled,
	});

	records.forEach(async (record) => {
		await RecordDetails.create({
			lessRecordID: pullData.lessRecordID,
			itemID: record.itemCode,
			brandID: record.brand,
			quantity: record.quantity,
			unitID: record.unitID,
		});
	});

	if (pull == null) {
		res.json("invalid");
	} else {
		res.json("created");
	}
};
