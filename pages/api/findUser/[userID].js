import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/UserSchema";

export default async (req, res) => {
	await dbConnect();

	console.log("query is:", req.query.userID);

	let userInfo = await User.findOne({ userID: req.query.userID });

	if (userInfo == null) {
		console.log("error cannot find user");
	} else {
		console.log("user found");
	}

	res.json(userInfo);
};
