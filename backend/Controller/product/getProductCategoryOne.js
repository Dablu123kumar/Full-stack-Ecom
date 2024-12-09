import ProductModel from "../../Model/productModel.js"


const getProductCategory = async(req,res) => {
    try {
        const productCategory = await ProductModel.distinct('category')
    // array to store one product from each category
        const productByCategory= []
        for(const category of productCategory){
            const product = await ProductModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }
        res.status(200).json({
            message: 'fetch category successfully',
            success:true,
            data:productByCategory
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
    }
}

export default getProductCategory