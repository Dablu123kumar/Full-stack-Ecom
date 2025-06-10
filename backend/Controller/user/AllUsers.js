import UserModel from "../../Model/UserModel.js"

const AllUsers = async (req,res) => {
try {
    //console.log('userId', req.userId)
    const allUsers = await UserModel.find()
    res.status(200).json({
        message:"all users",
        data:allUsers
    })
} catch (error) {
    res.status(400).json({
        message: error.message || error,
        success:false
    })
}
}

export default AllUsers