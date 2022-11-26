import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	userID: {
		type: String,
		minlength: 8,
		maxlength: 8,
		unique: true,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		maxLength: 50,
	},
	password: {
		type: String,
		required: true,
		maxLength: 76,
	},
	roleID: {
		type: String,
		minlength: 4,
		maxlength: 4,
		required: true,
	},
	creatorID: {
		type: String,
		minlength: 8,
		maxlength: 8,
		required: true,
	},
	creationDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
	disabled: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
