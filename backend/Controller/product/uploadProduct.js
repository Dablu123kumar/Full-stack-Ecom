import uploadProductPermission from "../../helper/permission.js"
import ProductModel from "../../Model/productModel.js"



const UploadProduct = async(req,res) => {
    try {
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
             throw new Error('Permission denied')
        }
        const uploadProduct = new ProductModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(200).json({
            message:'Product Uploaded Successfully',
            success:true,
            data:saveProduct,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
    }
}

export default UploadProduct