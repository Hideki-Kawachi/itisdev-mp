import mongoose from "mongoose";

const AddInventorySchema = new mongoose.Schema({
  addRecordID: {
    type: String,
    minlength: 15,
    maxlength: 15,
    unique: true,
    required: true,
  },
  invoiceNumber: {
    type: String,
    minlength: 5,
    maxlength: 15,
    unique: true,
    required: true,
  },
  partNumber: {
    type: String,
    minlength: 5,
    maxlength: 15,
  },
  supplierID: {
    type: String,
    minlength: 4,
    maxlength: 4,
    required: true,
  },
  brandID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  itemID: {
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitID: {
    type: String,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  unitPrice: {
    type: Number,
  },
  acquireDate: {
    type: Date,
    required: true,
    default: new Date(),
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
  itemModel: {
    type: String,
    maxLength: 50,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const AddInventory = mongoose.models.AddInventory || mongoose.model("AddInventory", AddInventorySchema);

export default AddInventory;
