
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../../Model/UserModel.js';

const UserLogin = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            })
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(isValidPassword){
             const tokenData = {
                  _id:user._id,
                  email:user.email,
             }
          const token =  await jwt.sign(tokenData , process.env.JSON_SECRET_KEY, { expiresIn: '5h' });
          const tokenOption = {
            httpOnly:true,
            secure:true,
            sameSite : 'None',
          }
          res.cookie('token',token,tokenOption).status(200).json({
            message: "Login Successfull",
            data:token,
            success:true,
          })
        }
        else{
            return res.status(400).json({
                message: "invalid email or password please check!"
            })
        }
       // console.log(isValidPassword)
    } catch (error) {
        res.status(400).json({
            message:error,
            error:true,
            success:false
        })
    }
}


export default UserLogin