import mongoose from "mongoose";

const EngineSchema = new mongoose.Schema({
  engineTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  engineName: {
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

const engineType =
  mongoose.models.engineType || mongoose.model("engineType", EngineSchema);

export default engineType;
