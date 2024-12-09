import ProductModel from "../../Model/productModel.js"

const GetProductDetails = async (req,res) =>{
    try {
        const {productId} = req.body
        const product = await ProductModel.findById(productId)
        res.status(200).json({
            data:product,
            message: "ok",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
    }
}

export default GetProductDetails

