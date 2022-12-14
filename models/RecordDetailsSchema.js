import mongoose from "mongoose";

const RecordDetailsSchema = new mongoose.Schema({
	lessRecordID: {
		type: String,
		minlength: 15,
		maxlength: 15,
		required: true,
	},
	itemID: {
		type: String,
		minlength: 5,
		maxlength: 10,
		required: true,
	},
	brandID: {
		type: String,
		minlength: 5,
		maxlength: 5,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	unitID: {
		type: String,
		minlength: 5,
		maxlength: 5,
		required: true,
	},
});

const RecordDetails =
	mongoose.models.RecordDetails ||
	mongoose.model("RecordDetails", RecordDetailsSchema);

export default RecordDetails;
