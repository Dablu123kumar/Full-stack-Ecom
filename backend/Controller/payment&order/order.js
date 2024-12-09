import ordermodel from "../../Model/orderModel.js"

const order = async(req,res)=>{
    try {
        const currentUserId = req?.userId

        const orderList = await ordermodel.find({userId : currentUserId}).sort({createdAt : -1})
        res.status(200).json({
            data : orderList,
            message : "order list",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            success:false
        })
    }
}

export default order