import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    pinCode: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;