import dbConnect from "../../../lib/dbConnect";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema";
import Item from "../../../models/ItemSchema";
import PullInventory from "../../../models/PullInvSchema";
import RecordDetails from "../../../models/RecordDetailsSchema";

export default async (req, res) => {
	await dbConnect();

	const pullData = req.body.pullInvData;
	const records = req.body.detailsArray;

	const SDLeadTime = 5;
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
				brandID: record.brandID,
				quantity: record.quantity,
				unitID: record.unitID,
				pullDate: pullData.pullDate,
			});

			let lastMonth = new Date();
			lastMonth.setMonth(lastMonth.getMonth() - 1);
			lastMonth.setHours(0, 0, 0, 0);
			console.log("LAST MONTH IS:", lastMonth);

			let past = await RecordDetails.find(
				{
					itemID: record.itemCode,
					brandID: record.brandID,
					pullDate: { $gte: lastMonth },
				},
				{ pullDate: 1, quantity: 1 }
			).sort({ pullDate: -1 });

			if (past.length >= 3) {
				let totalConsumption = 0;
				past.forEach((past) => {
					totalConsumption += past.quantity;
				});

				//look for all pull out records of itemID the past 30 days(?)
				let aveDemand = totalConsumption / 30;
				let safetyStock = SDLeadTime * serviceLevel * aveDemand;
				let demandLeadTime = SDLeadTime * aveDemand;
				let reorderPoint = Math.floor(demandLeadTime + safetyStock);

				console.log("TOTAL IS:", totalConsumption);
				console.log("SAFETY IS:", safetyStock);
				console.log("DEMAND LEAD IS:", demandLeadTime);
				console.log("REORDER IS:", reorderPoint);

				await Item.updateOne(
					{ itemID: record.itemCode },
					{
						$inc: { quantity: -record.quantity },
						minQuantity: reorderPoint,
					}
				);
			} else {
				await Item.updateOne(
					{ itemID: record.itemCode },
					{
						$inc: { quantity: -record.quantity },
					}
				);
			}
			await ItemBrandCombination.updateOne(
				{ itemID: record.itemCode, brandID: record.brandID },
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
