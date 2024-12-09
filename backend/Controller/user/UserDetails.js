import UserModel from "../../Model/UserModel.js"


const UserDetails = async(req,res) => {
    try {
        console.log("userid",req.userId)
        const user = await UserModel.findById(req.userId)
        res.status(200).json({
            data : user,
            message : "User Details Fetched Successfully",
            success:true
        })
        console.log('user' , user)
    } catch (error) {
        res.status(400).json({
            message: "Error fetching user details" || error,
            success:false
        })
    }
}

export default UserDetails
