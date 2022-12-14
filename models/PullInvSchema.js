import mongoose from "mongoose";

const PullInventorySchema = new mongoose.Schema({
	lessRecordID: {
		type: String,
		minlength: 15,
		maxlength: 15,
		unique: true,
		required: true,
	},
	pullDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
	JOnumber: {
		type: String,
		minlength: 15,
		maxlength: 15,
		required: true,
	},
	plateNum: {
		type: String,
		minlength: 5,
		maxlength: 8,
		unique: true,
		required: true,
	},
	mechanicName: {
		type: String,
		maxlength: 100,
		require: true,
	},
	remarks: {
		type: String,
		maxlength: 100,
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
	editorID: {
		type: String,
		minlength: 8,
		maxlength: 8,
	},
	editDate: {
		type: Date,
	},
	disabled: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const PullInventory =
	mongoose.models.PullInventory ||
	mongoose.model("PullInventory", PullInventorySchema);

export default PullInventory;
