const ErrorHandler = require('../utils/errorHandler');
const asyncError=require('../middleware/asyncError');
const User=require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto=require('crypto');
const cloudinary=require('cloudinary');

// Register User
exports.registerUser=asyncError(async(req,res,next)=>{
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
    const {name,email,password}=req.body;
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
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

  // Get User Detail
exports.detailUser=asyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id);
  // if(!user)
  // {
  //     return next(new ErrorHandler("User not found",404));
  // }
  res.status(200).json({success:true,
      user});
  })

  // Update User Password
exports.updatePassword=asyncError(async(req,res,next)=>{
  let user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is incorrect",401));
    }

    if(req.body.newPassword!==req.body.confirmPassword)
    {
      return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
})
  // Update User detail
exports.updateUserDetail=asyncError(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  };

  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });

  res.status(200).json({
    success:true,
  });
});

// Get all users (admin)
exports.getAllUsers=asyncError(async(req,res)=>{
  const users=await User.find();
  res.status(200).json({success:true,
      users,
    });
});

// Get a user (admin)
exports.getUser=asyncError(async(req,res)=>{
  const user=await User.findById(req.params.id);

  if(!user)
  {
    return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`,400))
  }
  res.status(200).json({success:true,
      user,
    });
});

  // Update User Role -- Admin
  exports.updateUserRole=asyncError(async(req,res,next)=>{
    const newUserData={
      name:req.body.name,
      email:req.body.email,
      role:req.body.role,
    };
  
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false,
    });
  
    res.status(200).json({
      success:true,
    });
  });
  
  // Delete User  -- Admin
  exports.deleteUser=asyncError(async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id);

    if(!user)
    {
      return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400))
    }

    await user.deleteOne();
    res.status(200).json({
      success:true,
      message:"User deleted successfully"
    });
  });
  
 