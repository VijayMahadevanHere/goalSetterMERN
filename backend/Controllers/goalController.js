const asyncHandler=require('express-async-handler')
const Goal=require('../models/goalModel')



const getGoals= asyncHandler(async(req,res)=>{
    const goal=await Goal.find({user:req.user.id})
    if(!goal){
        res.status(400)
        throw new Error('Goals dont exist')
    }
    res.status(200).json(goal)
})
const setGoal=asyncHandler(async(req,res)=>{
    if(!req.body.text){
           res.status(400)
           throw new Error('Please sent valid item')
    }
 const goal=   await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json({goal})
})


const updateGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Item not exist')
    }
    
    if(!req.user){
        res.status(401)
        throw new Error('user not Found')
    }
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error ('user  unathorized')
    }

    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,{text:req.body.text},{
        new:true
    })




    res.status(200).json({message:`updated goal ${updatedGoal._id}`})
})


const deleteGoal=asyncHandler(async(req,res)=>{
    const goal= await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Item not exist')
    }
  
    if(!req.user){
        res.status(401)
        throw new Error('user not Found')
    }
    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error ('user  unathorized')
    }
    
    await goal.deleteOne(); 


    res.status(200).json({id : req.params.id })
})


module.exports={
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal

}