import dbConnect from "../../lib/dbConnect";
import User from "../../models/UserSchema";

dbConnect();

export default async function handler(req, res) {
	const { employeeID, password, disabled} = req.body;
    // console.log(req.body);

	//bcrypt 

	console.log("User: " + employeeID + " Pass: " + password + " Disabled:" + disabled);

	const user = await User.findOne({userID: employeeID, password: password, disabled: disabled});

	console.log(user);

	
	if (!user) {
		return res.json(false);
	} else {
		console.log(req.body);
		return res.json(user);
		// res.redirect("/dashboard");
		//Session
	}
}
