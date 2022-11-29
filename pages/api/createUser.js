import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";
import bcrypt from "bcrypt";

export default async (req, res) => {
	await dbConnect();

	const userInfo = req.body;

	let invalidUserID = await User.findOne({ userID: userInfo.userID });

	if (invalidUserID != null) {
		console.log("INVALID");
		res.json(userInfo.userID);
	} else {
		userInfo.password = await bcrypt.hash(req.body.password, 10);

		await User.create(userInfo);
		res.json("created");
	}
};
