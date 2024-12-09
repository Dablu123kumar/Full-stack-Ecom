import UserModel from "../../Model/UserModel.js"


 
 const UpdateUser = async (req,res)=>{
      try {

        const sessionUser = req.userId
        const {userId,email,name,role} = req.body

         const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})

         }

         const user = await UserModel.findById(sessionUser)
         console.log('user',user)
 
         const updateUser = await UserModel.findByIdAndUpdate(userId,payload)
         res.status(400).json({
            message: 'User Updated',
            success:true,
            data:UpdateUser
        })
         
       } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success:false
        })
      }
 }

 export default UpdateUser