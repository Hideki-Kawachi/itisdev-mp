import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema({
  vehicleTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  typeName: {
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

const VehicleType =
  mongoose.models.VehicleType ||
  mongoose.model("VehicleType", VehicleTypeSchema);

export default VehicleType;
