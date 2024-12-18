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
    pinCode: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        default: '',
        unique: true
    },
    city: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;