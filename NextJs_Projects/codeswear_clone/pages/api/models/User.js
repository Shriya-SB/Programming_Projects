import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: '',
        unique: true
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
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;