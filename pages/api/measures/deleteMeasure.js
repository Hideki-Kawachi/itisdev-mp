import dbConnect from "../../../lib/dbConnect";
import Measure from "../../../models/MeasureSchema";

export default async (req, res) => {
	await dbConnect();

	let result = await Measure.deleteOne({ unitID: req.body.unitID });

	if (result.deletedCount > 0) {
		res.json("Measure Deleted Successfully!");
	} else {
		res.json("Measure Deletion Failed");
	}
};
