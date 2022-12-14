import mongoose from "mongoose";

const ItemBrandCombinationSchema = new mongoose.Schema({
  combinationID: {
    type:String,
    unique: true,
  },
  itemID: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  itemBrandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ItemBrandCombination = mongoose.models.ItemBrandCombination || mongoose.model("ItemBrandCombination", ItemBrandCombinationSchema);

export default ItemBrandCombination;
