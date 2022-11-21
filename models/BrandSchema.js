import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  brandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
    maxLength: 50,
  },

  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;
