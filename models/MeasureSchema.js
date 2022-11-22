import mongoose from "mongoose";

const MeasureSchema = new mongoose.Schema({
  unitID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  unitName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  unitTypeID: {
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

const engineType =
  mongoose.models.Measure ||
  mongoose.model("engineType", MeasureSchema);

export default engineType;
