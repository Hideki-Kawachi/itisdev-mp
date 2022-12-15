import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  auditID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    unique: true,
    required: true,
  },
  itemID: {
    type: String,
    minlength: 5,
    maxlength: 10,
    required: true,
  },
  auditDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  systemCount: {
    type: Number,
    required: true,
  },

  physicalCount: {
    type: Number,
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
});

const Audit =
  mongoose.models.Audit || mongoose.model("Audit", AuditSchema);

export default Audit;
