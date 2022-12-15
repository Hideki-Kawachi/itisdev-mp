import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";
import PullInventory from "../../../models/PullInvSchema";
import RecordDetails from "../../../models/RecordDetailsSchema";

export default async (req, res) => {
	await dbConnect();

	const pullData = req.body.pullInvData;
	const records = req.body.detailsArray;

	const SDLeadTime = 2;
	const serviceLevel = 1.64;

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

	if (pull instanceof PullInventory) {
		records.forEach(async (record) => {
			await RecordDetails.create({
				lessRecordID: pullData.lessRecordID,
				itemID: record.itemCode,
				brandID: record.brand,
				quantity: record.quantity,
				unitID: record.unitID,
			});

			//look for all pull out records of itemID the past 30 days(?)
			//let aveDemand = totalConsumption / timeframe in days
			// let safetyStock = SDLeadTime * serviceLevel * aveDemand
			// let demandLeadTime = SDLeadTime * aveDemand
			// let reorderPoint = demandLeadTime + safetyStock

			await Item.updateOne(
				{ itemID: record.itemCode },
				{ $inc: { quantity: -record.quantity } }
			);
		});
	} else {
		res.json("invalid");
	}

	if (pull == null) {
		res.json("invalid");
	} else {
		res.json("created");
	}
};
