import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";
import bcrypt from "bcrypt";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";

dbConnect();

export default withIronSessionApiRoute(login, ironOptions);

async function login(req, res) {
	const { employeeID, password, disabled } = req.body;
	
	await dbConnect();

	const user = await User.findOne({ userID: employeeID});

	let isDisabled = true;
	
	if (user) {
		isDisabled = user.get("disabled");
	}

	if (!user || isDisabled) {
		return res.json("Invalid userID");
	} else {
		const retrievedHash = user.get("password");
		const isMatch = await bcrypt.compare(password, retrievedHash);

		if (isMatch) {
			req.session.user = {
				userID: user.userID,
				firstName: user.firstName,
				lastName: user.lastName,
				roleID: user.roleID,
			};

			await req.session.save();
			res.json("Logged in");
		} else {
			res.json("Invalid Password");
		}
	}
}
