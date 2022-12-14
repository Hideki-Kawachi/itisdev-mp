import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
	itemID: {
		type: String,
		maxlength: 10,
		unique: true,
		required: true,
	},
	categoryID: {
		type: String,
		minlength: 5,
		maxlength: 5,
		required: true,
	},
	itemName: {
		type: String,
		required: true,
		maxLength: 50,
	},
	itemModel: {
		type: String,
		maxLength: 50,
	},
	unitID: {
		type: String,
		minlength: 5,
		maxlength: 5,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	minQuantity: {
		type: Number,
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

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
