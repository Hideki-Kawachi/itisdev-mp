import dbConnect from "../../../lib/dbConnect";
import Measure from "../../../models/MeasureSchema";

export default async (req, res) => {
	await dbConnect();

	const measureInfo = req.body;

	let result = await Measure.updateOne(
		{ unitID: measureInfo.unitID },
		{
			unitName: measureInfo.unitName,
			abbreviation: measureInfo.abbreviation,
			unitTypeID: measureInfo.unitTypeID,
			classTypeID: measureInfo.classTypeID,
			disabled: measureInfo.disabled,
		}
	);

	if (result.modifiedCount == 0 && result.matchedCount > 0) {
		res.json("No Fields Edited");
	} else if (result.modifiedCount == 0) {
		res.json("Edit is Invalid");
	} else {
		res.json("Measure Successfully Edited!");
	}
};
