import addToCartModel from "../../Model/cartProductModel.js"

const countAddToCartProduct =async (req,res)=>{
    try {
        const userId = req?.userId
        const count = await addToCartModel.countDocuments({
            userId:userId
        })
        res.status(200).json({
            data:{count:count},
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

export default countAddToCartProduct