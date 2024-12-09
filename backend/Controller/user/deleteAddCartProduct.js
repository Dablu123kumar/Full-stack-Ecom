import addToCartModel from "../../Model/cartProductModel.js"

const deleteAddToCartProduct = async(req,res) =>{
    try {
        const currentUserId = req.currentUserId
        const addToCartProductId = req?.body?._id
        const deleteproduct = await addToCartModel.deleteOne({_id:addToCartProductId})
        res.status(200).json({
            data:deleteproduct,
            message:"Product deleted from your cart",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:error?.message || error,
            success:false
        })
    }
}

export default deleteAddToCartProduct