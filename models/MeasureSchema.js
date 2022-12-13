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
  abbreviation: {
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
  classTypeID: {
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

const Measure =
  mongoose.models.Measure ||
  mongoose.model("Measure", MeasureSchema);

export default Measure;
