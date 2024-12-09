import ProductModel from "../../Model/productModel.js"

const searchProduct = async(req,res) =>{
    try {
        const query = req?.query?.q
        const regex = new RegExp(query,'i','g')
        const product = await ProductModel.find({
            "$or" : [
            {
                productName : regex
            },
            {
                category : regex
            }
        ]
        })
        res.status(200).json({
            data:product,
            message: "Search product list",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message ||error,
            success:false
        })
    }
}

export default searchProduct