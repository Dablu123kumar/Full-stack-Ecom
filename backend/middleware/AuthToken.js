import jwt from 'jsonwebtoken'

const authToken = async(req,res,next) => {
    try {
        const token = req.cookies?.token 
        // console.log('token  ', token)
        if(!token) {
            return res.status(401).json({
                message:"Please login !...",
                success:false
            })
        }
        jwt.verify(token, process.env.JSON_SECRET_KEY, function(err, decoded) {
            // console.log(err)
            // console.log('decoded  : ',decoded)
            if(err){
                console.log('auth error ' , err)
            }
            req.userId = decoded?._id
            next()

          });
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            data:[],
            success:false
        })
    }
}

export default authToken