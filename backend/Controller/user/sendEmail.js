
import UserModel from "../../Model/UserModel.js";
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const SendEmail = async (req, res) => {
  try {
    const email = req?.body?.email;
    const JSON_SECRET_KEY =  process.env.JSON_SECRET_KEY 
    const FRONTEND_URL = process.env.FRONTEND_URL
    const NODEMAILER_USERID = "krishnaroysilaur@gmail.com";
    const NODEMAILER_PASSWORD = "ijiu lyds odbz ojyl";
  
    const data = await UserModel.findOne({ email: email });
    if (!data){
      return res.status(400).json({
        message: " email not found",
        success: false,
      });
    }
    const token = jwt.sign({id : data?._id},JSON_SECRET_KEY,{expiresIn :'1h'} )

    const  transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, 
      auth: {
        user: NODEMAILER_USERID,
        pass: NODEMAILER_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: NODEMAILER_USERID, //sender address
        to: email, // list of receivers
        subject: "Reset password email send by krishnaroy", // Subject line
        text: `${FRONTEND_URL}/reset-password/${data?._id}/${token}`,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({
          message: "Please check your email!",
          success: true,
        });
      }
    });
  } catch (error) {
     return res.status(400).json({
      message: error.message || error,
      success: false,
    });
  }
};

export default SendEmail;
