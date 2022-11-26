import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

dbConnect();

export default async function handler(req, res) {
	const { employeeID, password, disabled} = req.body;

	console.log("User: " + employeeID + " Pass: " + password + " Disabled:" + disabled);

	const user = await User.findOne({userID: employeeID, disabled: disabled});

	if (!user) {
		return res.json(false);
	} else {
		//Retrieve the hash
		const retrievedHash = user.get("password");
		const hashPass = await hash(password, 10); //10 is the salt rounds
		const isMatch = await bcrypt.compare(password, retrievedHash);

		if (!isMatch) {
			return res.json(false);
		}
		// res.redirect("/dashboard");
		//Session

		return res.json(user);
	}
}
