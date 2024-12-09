import addToCartModel from "../../Model/cartProductModel.js";

const addToCart =async (req,res)=>{
    try {
        const {productId} = req?.body;
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({productId,userId:currentUser})
        if(isProductAvailable){
            return res.status(400).json({
                message:"This Product is already exist in your cart",
                success:false
            })
        }
        const payload = {
            productId:productId,
            quantity:1,
            userId:currentUser,
           
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()
        return res.status(200).json({
            data:saveProduct,
            message:" Product added in your cart",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            success:false
        })
    }
}

export default addToCart