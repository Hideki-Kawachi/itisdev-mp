import mongoose from "mongoose";

const GPSSchema = new mongoose.Schema({
  GPSProviderID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },

  providerName: {
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

const gpsProvider =
  mongoose.models.gpsProvider || mongoose.model("gpsProvider", GPSSchema);

export default gpsProvider;
