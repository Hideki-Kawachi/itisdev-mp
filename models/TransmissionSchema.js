import mongoose from "mongoose";

const TransmissionSchema = new mongoose.Schema({
  transmissionID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  transmissionName: {
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

const Transmission =
  mongoose.models.Transmission ||
  mongoose.model("Transmission", TransmissionSchema);

export default Transmission;
