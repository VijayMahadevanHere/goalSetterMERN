const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        requred:[true,'Name required']
    },
    email:{
        type:String,
        requred:[true,'email required'],
        unique:true
    },
    password:{
        type:String,
        requred:[true,'Password required']
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)