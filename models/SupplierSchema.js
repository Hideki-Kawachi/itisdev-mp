import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
    supplierID: {
        type: String,
        minlength: 4,
        maxlength: 4,
        unique: true,
        required: true,
    },
    supplierName: {
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

const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);

export default Supplier;
