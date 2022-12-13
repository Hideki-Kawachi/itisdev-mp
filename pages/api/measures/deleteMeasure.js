import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

export default async (req, res) => {
	await dbConnect();

	let result = await User.deleteOne({ userID: req.body.userID });

	if (result.deletedCount > 0) {
		res.json("User Deleted Successfully!");
	} else {
		res.json("User Deletion Failed");
	}
};
