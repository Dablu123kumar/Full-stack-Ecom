
import bcrypt from 'bcrypt'
import UserModel from '../../Model/UserModel.js'
const UserSignup = async (req,res) => {
    try {
        const {name,email,password} = req.body
        
        if(!email || !name || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const user = await UserModel.findOne({email:email})
        if(user){
            return res.status(400).json({
                message:"User already exist!"
            })
        }
       
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
          const payload = {
            ...req.body,
            // role :'GENERAL',
            password:hashedPassword

          }
        const userData = new UserModel(payload)
        const saveUser= await userData.save()
        res.status(200).json({
            success:true,
            data:saveUser,
            message:"User created successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:error,
            error:true,
            success:false
        })
    }
}

export default UserSignup

