import mongoose, { Schema } from "mongoose";
const ProductSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,

},{
    timestamps:true
})

const ProductModel = mongoose.model('Product',ProductSchema)
export default ProductModel