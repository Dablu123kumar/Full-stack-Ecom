import mongoose from 'mongoose'

const forgotSchem = new mongoose.Schema({
    email:String,
    code:String,
    expireIn:Number,
},{
    timestamps : true
})

const forgotPasswordByOTPModel = mongoose.model('forgot',forgotSchem)
 
export default forgotPasswordByOTPModel