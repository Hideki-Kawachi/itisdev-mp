import mongoose from "mongoose";

const ItemBrandCombinationSchema = new mongoose.Schema({
  itemID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  itemBrandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
//   disabled: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
});

const ItemBrandCombination = mongoose.models.ItemBrandCombination || mongoose.model("ItemBrandCombination", ItemBrandCombinationSchema);

export default ItemBrandCombination;