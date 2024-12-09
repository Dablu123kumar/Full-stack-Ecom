import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,
    profilePic:String,
    role : {
        type:String,
        enum : ["ADMIN","GENERAL","FARMER"],
        default : "GENERAL"       
    },

},{
    timestamps:true
})


const UserModel = mongoose.model('User',UserSchema)
export default UserModel