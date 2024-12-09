const UserLogout = (req,res )=> {
try {
    const tokenOption = {
        httpOnly:true,
        secure:true,
        sameSite : 'None',
      }
    res.clearCookie('token',tokenOption)
    res.status(200).json({
        message: 'User logged out successfully',
        success:true,
        data:[]
    })
} catch (error) {
    res.status(400).json({
        message: error.message || error,
        success:false
    })
}
}

export default UserLogout