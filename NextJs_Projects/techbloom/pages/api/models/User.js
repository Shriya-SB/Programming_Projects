const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        default: "",
        unique: true
    },
    address: {
        type: String,
        default: ''
    },
    pinCode: {
        type: Number,
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

let User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;