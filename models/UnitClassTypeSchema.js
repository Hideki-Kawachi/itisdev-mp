import mongoose from "mongoose";

const UnitClassTypeSchema = new mongoose.Schema({
  ClassTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  ClassTypeName: {
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

const classType =
  mongoose.models.classType ||
  mongoose.model("classType", UnitClassTypeSchema);

export default classType;
