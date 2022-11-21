import mongoose from "mongoose";

const ItemCategorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  categoryName: {
    type: String,
    unique: true,
    required: true,
    maxLength: 50,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ItemCategory = mongoose.models.ItemCategory || mongoose.model("ItemCategory", ItemCategorySchema);

export default ItemCategory;
