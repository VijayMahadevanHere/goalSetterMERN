const { stack } = require("../Routes/goalRoutes")

const errorHandler=(err,req,res,next)=>{
let statusCode= res.statusCode ? res.statusCode :500

res.status(statusCode)
res.json({
    message:err.message,
    stack: process.env.NODE_ENV==='Production' ? null :err.stack
})

}

module.exports={ 
    errorHandler
}