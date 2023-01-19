import dbConnect from "../../../../lib/dbConnect";
import EngineType from "../../../../models/EngineSchema";

export default async (req, res) => {
	await dbConnect();

	const engineTypeInfo = req.body;

	let result = await EngineType.updateOne(
		{ engineTypeID: engineTypeInfo.engineTypeID },
		{
			name: engineTypeInfo.name,
			disabled: engineTypeInfo.disabled,
		}
	);

	if (result.modifiedCount == 0 && result.matchedCount > 0) {
		res.json("No Fields Edited");
	} else if (result.modifiedCount == 0) {
		res.json("Edit is Invalid");
	} else {
		res.json("Option Successfully Edited!");
	}
};
