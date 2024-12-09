import jwt from 'jsonwebtoken'
import UserModel from "../../Model/UserModel.js"
import bcrypt, { hash } from 'bcrypt'

const ChangePassword = async(req,res)=>{
    try {
         const {id, token} = req?.params;
         const {password} = req?.body;
         const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY
        jwt.verify(token, JSON_SECRET_KEY,(err,decoded) => {
            if (err){
                return res.status(401).json({
                    message : "Error with token",
                    success : false
                })
            }
            else{
                 bcrypt.hash(password,10) 
                .then((hash) => {
                    UserModel.findByIdAndUpdate({_id : id}, {password : hash})
                    .then((user) => {
                        res.status(200).json({
                            data: user,
                            message : "Password updated successfully",
                            success : true
                        }) 
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message : err.message || err,
                            success : false
                        })
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message : err.message || err,
                            success : false
                    })
                }) 
            }
        })
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            success : false
        })
    }
}

export default ChangePassword