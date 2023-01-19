import dbConnect from "../../../../lib/dbConnect";
import VehicleType from "../../../../models/VehicleTypeSchema";

export default async (req, res) => {
	await dbConnect();

	const vehicleTypeInfo = req.body;

	let result = await VehicleType.updateOne(
		{ vehicleTypeID: vehicleTypeInfo.vehicleTypeID },
		{
			name: vehicleInfo.name,
			disabled: vehicleInfo.disabled,
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
