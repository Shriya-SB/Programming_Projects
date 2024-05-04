import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Use a consistent naming convention for models (capitalize the first letter)
let Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact