import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  plateNum: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  vehicleTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  brandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  manufacturingYear: {
    type: Int32,
    minlength: 4,
    maxlength: 4,
    required: true,
  },
  transmissionID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  engineNum: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
  },
  engineTypeID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  chassisID: {
    type: String,
    maxlength: 50,
    required: true,
  },
  gpsID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  fuelSensorID: {
    type: String,
    maxlength: 50,
    required: true,
  },
  insuranceAmount: {
    type: String,
    required: true,
  },
  insuranceExpDate: {
    type: Date,
    required: true,
  },
  creatorID: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
