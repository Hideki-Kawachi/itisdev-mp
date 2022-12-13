import dbConnect from "../../../lib/dbConnect";
import Measure from "../../../models/MeasureSchema";

export default async (req, res) => {
	await dbConnect();

	const measureInfo = req.body;

	let invalidMeasureID = await Measure.findOne({ unitID: measureInfo.unitID });
	console.log(invalidMeasureID)
	if (invalidMeasureID != null) {
		console.log("INVALID");
		res.json(measureInfo.unitID);
	} else {
		await Measure.create(measureInfo);
		res.json("created");
	}
};
