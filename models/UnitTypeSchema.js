import mongoose from "mongoose";

const UnitTypeSchema = new mongoose.Schema({
  UnitTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  UnitTypeName: {
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

const vehicleType =
  mongoose.models.unitType ||
  mongoose.model("vehicleType", UnitTypeSchema);

export default vehicleType;
