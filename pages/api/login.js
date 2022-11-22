import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

dbConnect();

export default async function handler(req, res) {
	const { userID, password } = req.body;
    // console.log(req.body);
	const user = await User.findOne({ userID, password });
	if (!user) {
		return res.json({ status: "Not able to find the user" });
	} else {
		res.redirect("/dashboard");
	}
}
