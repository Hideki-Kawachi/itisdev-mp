import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";

dbConnect();

export default withIronSessionApiRoute(login, ironOptions);

async function login(req, res) {
	const user = await User.findOne({});

	req.session.user = {
		userID: user.userID,
		firstName: user.firstName,
		lastName: user.lastName,
		roleID: user.roleID,
	};

	await req.session.save();
	res.json("Logged in");
}
