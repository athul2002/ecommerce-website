const ErrorHandler = require('../utils/errorHandler')

module.exports=(err,req,res,next)=>{
    err.stausCode=err.stausCode||500;
    err.message=err.message||"Internal Server Error";

    if(err.name==="CastError")
    {
        const message = `Resource not found. Invalid:${err.path}`;
        err=new ErrorHandler(message,404)
    }
    res.status(err.stausCode).json({
        success:false,
        error:err.stack,
    });
};