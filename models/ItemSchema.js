import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemID: {
    type: String,
    minlength: 10,
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
    unique: true,
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
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ItemCategory = mongoose.models.ItemCategory || mongoose.model("ItemCategory", ItemSchema);

export default ItemCategory;