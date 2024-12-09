import ProductModel from "../../Model/productModel.js"


const GetProduct = async(req,res) =>{
    try {
        const allProduct = await ProductModel.find().sort({createdAt:-1})
        res.status(200).json({
            message: 'All products',
            success:true,
            data:allProduct
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
    }
}

export default GetProduct