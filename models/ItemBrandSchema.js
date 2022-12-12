import mongoose from "mongoose";

const ItemBrandSchema = new mongoose.Schema({
  itemBrandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  name: {
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

const ItemBrand = mongoose.models.ItemBrand || mongoose.model("ItemBrand", ItemBrandSchema);

export default ItemBrand;
