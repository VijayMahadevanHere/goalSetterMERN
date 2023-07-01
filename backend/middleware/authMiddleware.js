
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const asyncHandler=require('express-async-handler');


const protect=asyncHandler(async(req,res,next)=>{


if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
   try {


    let token=req.headers.authorization.split(' ')[1]
 
       let decoded=jwt.verify(token,process.env.JWT_SECRET)
      
    req.user= await User.findById(decoded.id).select('-password')
    next()

   } catch (err) {
    res.status(401)
    throw new Error('invalid token')
    
   }

}else{
    res.status(401)
    throw new Error('token not found')
}

})



module.exports={
    protect
}
