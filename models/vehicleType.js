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

const vehicleType =
  mongoose.models.vehicleType ||
  mongoose.model("vehicleType", VehicleTypeSchema);

export default vehicleType;
