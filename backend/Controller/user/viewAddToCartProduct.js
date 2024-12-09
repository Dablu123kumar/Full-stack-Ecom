import addToCartModel from "../../Model/cartProductModel.js"

const viewAddToCartProduct =async (req,res) => {
try {
    const currentUser = req?.userId
    const allProduct = await addToCartModel.find({
        userId:currentUser
    }).populate("productId")
    res.status(200).json({
        data:allProduct,
        message:"OK",
        success:true
    })
} catch (error) {
    res.status(400).json({
        message:error.message || error,
        success:false
    })
}
}

export default viewAddToCartProduct