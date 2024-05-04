import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        default: ''
    },
    memory: {
        type: String,
        default: ''
    },
    storage: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    display: {
        type: String,
        default: ''
    },
    webcamp: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    },
    sound_driver: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product