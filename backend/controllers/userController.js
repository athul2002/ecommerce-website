const ErrorHandler = require('../utils/errorHandler');
const asyncError=require('../middleware/asyncError');
const User=require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto=require('crypto');

// Register User
exports.registerUser=asyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"profilePicUrl"
        }
    });

    sendToken(user,201,res);
});

// Login User
exports.loginUser=asyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    // checking if user given both
    if(!email||!password)
    {
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Credentials",401));
    }
    sendToken(user,200,res);
});


//Logout User
exports.logout=asyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully",
    });
})

// FORGOT PASSWORD
exports.forgotPassword = asyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });
  

  // Reset Password
  exports.resetPassword=asyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()},
    });

    if(!user)
    {
      return next(new ErrorHandler("Reset password token expired or is invalid",400));
    }
    if(req.body.password!=req.body.confirmPassword)
    {
      return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;

    await user.save();
    sendToken(user,200,res);
  });