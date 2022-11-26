import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";
import bcrypt from "bcrypt";
import { hash } from "bcrypt";

dbConnect();

export default async function handler(req, res) {
	const { employeeID, password, disabled} = req.body;
    // console.log(req.body);

	//bcrypt 

	console.log("User: " + employeeID + " Pass: " + password + " Disabled:" + disabled);

	const user = await User.findOne({userID: employeeID, password ,disabled: disabled});

	const retrievedHash = user.password;

	console.log("Retrieved hash is" + retrievedHash);

	// const hashPass = await hash(password, 10);
	// console.log(hashPass);

	const isMatch = await bcrypt.compare(password, retrievedHash);

	console.log("isMatch: " + isMatch);

	
	if (!user || !isMatch) {
		return res.json(false);
	} else {
		console.log("here: " + req.body);
		return res.json(user);
		// res.redirect("/dashboard");
		//Session
	}
}
