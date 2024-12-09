import UserModel from "../Model/UserModel.js"


const uploadProductPermission =async (userId) => {
    const user = await UserModel.findById(userId)
    if(user.role !== 'ADMIN'){
        return false
    }
    return true
}

export default uploadProductPermission