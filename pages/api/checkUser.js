import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

export default withIronSessionApiRoute(checkUser, ironOptions);

async function checkUser(req, res) {
	await dbConnect();

	console.log("user is:", req.session.user);
	res.json(req.session.user);

	let userInfo = await User.findOne(
		{ userID: req.query.userID },
		{ userID: 1, firstName: 1, lastName: 1, roleID: 1, disabled: 1 }
	);

	if (userInfo == null) {
		console.log("error cannot find user");
		res.json("user not found");
	} else {
		console.log("found user");
		res.json(userInfo);
	}
}
