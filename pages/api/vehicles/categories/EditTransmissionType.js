import dbConnect from "../../../../lib/dbConnect";
import Transmission from "../../../../models/TransmissionSchema";

export default async (req, res) => {
	await dbConnect();

	const transmissionInfo = req.body;

	let result = await gpsProvider.updateOne(
		{ transmissionID: transmissionInfo.transmissionID },
		{
			name: transmissionInfo.name,
			disabled: transmissionInfo.disabled,
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
