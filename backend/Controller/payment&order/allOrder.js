import ordermodel from "../../Model/orderModel.js"
import UserModel from "../../Model/UserModel.js"

const allOrder = async(req,res)=>{
    try {
        const userId = req?.userId

        const user = await UserModel.findById(userId)
        if(user.role !== 'ADMIN'){
            return  res.status(500).json({
                
                message : "not access",
                success:false
            })
        }
        const AllOrder = await ordermodel.find().sort({createdAt : -1})
        return  res.status(500).json({
                data : AllOrder,
            message : " access",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            success:false
        })
    }
}

export default allOrder