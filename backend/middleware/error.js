const ErrorHandler = require('../utils/errorHandler')

module.exports=(err,req,res,next)=>{
    err.stausCode=err.stausCode||500;
    err.message=err.message||"Internal Server Error";

    if(err.name==="CastError")
    {
        const message = `Resource not found. Invalid:${err.path}`;
        err=new ErrorHandler(message,404)
    }

    // Mongoose duplicate key error
    if(err.code===11000)
    {
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message,400);p
    }

    // Wrong JWT error
    if(err.name==="JsonWebTokenError")
    {
        const message=`Json Web Token is invalid,try again`;
        err=new ErrorHandler(message,400);
    }
    // JWT EXPIRE  error
    if(err.name==="TokenExpiredError")
    {
        const message=`Json Web Token is Expired,try again`;
        err=new ErrorHandler(message,400);
    }
    res.status(err.stausCode).json({
        success:false,
        error:err.stack,
    });
};