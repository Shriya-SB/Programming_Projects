import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;