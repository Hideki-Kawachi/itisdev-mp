import mongoose from "mongoose";

const PullInventorySchema = new mongoose.Schema({
  lessRecordID: {
    type: String,
    minlength: 5,
    maxlength: 15,
    unique: true,
    required: true,
  },
  pullDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  JOnumber: {
    type: String,
    minlength: 5,
    maxlength: 15,
    required: true,
  },
  itemID: {
    type: String,
    minlength: 5,
    maxlength: 10,
    required: true,
  },
  plateNum: {
    type: String,
    minlength: 5,
    maxlength: 8,
    unique: true,
    required: true,
  },
  mechanicName: {
    type: String,
    minlength: 30,
    maxlength: 100,
    required: true,
  },
  remarks: {
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  creatorID: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: true,
  },
  recordDate: {
    type: Date,
    required: true,
    default: new Date(),
    required: true,
  },
  editorID: {
    type: String,
    minlength: 8,
    maxlength: 8,
    required: true,
  },
  editDate: {
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

const PullInventory = mongoose.models.PullInventory || mongoose.model("PullInventory", PullInventorySchema);

export default PullInventory;
