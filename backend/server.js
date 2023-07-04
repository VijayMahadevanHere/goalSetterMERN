const path=require('path')
const express=require("express")
const app=express()
const colors=require('colors')
const dotenv=require('dotenv').config()
const port =process.env.PORT
const goalRoutes= require('./Routes/goalRoutes')
const userRoutes= require('./Routes/userRoutes')
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/dbconfig')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',goalRoutes)
app.use('/api/users',userRoutes)

//Serve FrontEnd
if(process.env.NODE_ENV==='production'){
app.use(express.static(path.join(__dirname,'../frontend/build')))
app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}else{
app.get('/',(req,res)=>res.send('Please set to production'))
}
   
app.use(errorHandler) 

      
app.listen(port,()=>console.log(`listening to port ${port}`)) 