
const User=require('../models/userModel')
const asyncHandler =require('express-async-handler')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const registerUser= asyncHandler(async(req,res)=>{
    const{name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Invalid request')
}


let userExist=await User.findOne({email})
if(userExist){
    res.status(500)
    throw new Error('User alredy exist')
}
let salt= await bcrypt.genSalt(10)
let hashedPassword= await bcrypt.hash(password,salt)
    
   let user=await User.create({
    name:name,
    email:email,
    password:hashedPassword,
    
    
   })
   if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
     

    })
   }else{
    res.status(400)
    throw new Error('invlalid inputs')
   }
  
})

const loginUser= asyncHandler(async(req,res)=>{
    const {password,email}=req.body
    if(!password || !email){
        res.status(400)
        throw new Error("Please enter the valid inputs ")
    }
    let user=await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){


        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })


    }else{
        res.status(401)
        throw new Error ('Invalid credintials')
       
    }
   



})

const getMe=(req,res)=>{
res.status(200).json(req.user)
    
}


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
  
  
}

module.exports={
  
    registerUser,
    loginUser,
    getMe
}