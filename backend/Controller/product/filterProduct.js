import ProductModel from "../../Model/productModel.js"

const filterProduct = async(req,res)=>{
    try {
        const categoryList = req?.body?.category || []

        const product = await ProductModel.find({
            category :{
                "$in" : categoryList
            }
        })
        res.status(200).json({
            data: product,
            message:"product",
            success:true
        })

    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            success:false
        })
    }
}

export default filterProduct