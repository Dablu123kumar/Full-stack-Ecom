import mongoose, { Schema } from "mongoose";
const AddToCartSchema = mongoose.Schema({
 productId:{
    ref:'Product',
    type:String,
 },
 quantity:Number,
 userId:String,

},{
    timestamps:true
})

const addToCartModel = mongoose.model('addToCart',AddToCartSchema)
export default addToCartModel
