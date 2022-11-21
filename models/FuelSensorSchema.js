import mongoose from "mongoose";

const FuelSensorSchema = new mongoose.Schema({
  FuelSensorID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  sensorName: {
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

const FuelSensor =
  mongoose.models.FuelSensor ||
  mongoose.model("FuelSensor", FuelSensorSchema);

export default FuelSensor;
