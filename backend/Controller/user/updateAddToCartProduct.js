import addToCartModel from "../../Model/cartProductModel.js"

const updateAddToCartProduct = async(req,res)=>{
    try {
        const currentUserId= req?.userId
        const addToCartProductId = req?.body?._id
        const qty = req?.body?.quantity
        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
           ...(qty && {quantity:qty})
        })
        res.status(200).json({
            data:updateProduct,
            message:"Product updated",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:error?.message || error,
            success:false
        })
    }
}

export default updateAddToCartProduct