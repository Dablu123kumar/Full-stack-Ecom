import ProductModel from "../../Model/productModel.js"

const getCategoryWiseProduct = async(req,res) =>{
    try {
        const {category} = req?.body || req?.query
        const product = await ProductModel.find({category})
        res.status(200).json({
            data:product,
            success:true,
            message:'product'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
    }
}

export default getCategoryWiseProduct