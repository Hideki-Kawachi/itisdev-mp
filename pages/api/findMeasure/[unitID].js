import dbConnect from "../../../lib/dbConnect";
import Measure from "../../../models/MeasureSchema";

export default async (req, res) => {
	await dbConnect();

	console.log("query is:", req.query.unitID);

	let measureInfo = await Measure.findOne({ unitID: req.query.unitID });

	if (measureInfo == null) {
		console.log("error cannot find user");
	} else {
		console.log("user found");
	}

	res.json(measureInfo);
};
