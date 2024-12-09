import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const DB_URI = process.env.DB_URI;
const ConnectedToDB =async () => {
    await mongoose.connect( DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
} 
export default ConnectedToDB;
