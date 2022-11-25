import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

export default async (req, res) => {
	await dbConnect();

	const userInfo = req.body;

	let result = await User.updateOne(
		{ userID: userInfo.userID },
		{
			disabled: userInfo.disabled,
		}
	);

	if (result.modifiedCount == 0) {
		res.json("Edit is Invalid");
	} else {
		res.json("User Successfully Edited!");
	}
};
