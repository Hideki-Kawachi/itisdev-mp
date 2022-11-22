import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

export default async (req, res) => {
	await dbConnect();

	const userInfo = req.body;

	let invalidUserID = await User.findOne({ userID: userInfo.userID });

	if (invalidUserID != null) {
		console.log("INVALID");
		res.json("invalid");
	} else {
		await User.create(userInfo);
		res.json("created");
	}
};
