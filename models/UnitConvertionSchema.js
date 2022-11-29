import mongoose from "mongoose";

const UnitConvertionSchema = new mongoose.Schema({
  parentUnit: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  childUnit: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },

  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const unitConvertion =
  mongoose.models.unitConvertion ||
  mongoose.model("vehicleType", UnitConvertionSchema);

export default unitConvertion;
