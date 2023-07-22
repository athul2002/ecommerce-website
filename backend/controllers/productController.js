const Product=require('../models/productModels');
const ErrorHandler = require('../utils/errorHandler');
const asyncError=require('../middleware/asyncError');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require("cloudinary");
// Create Product ->Admin only
exports.createProduct=asyncError(async(req,res,next)=>{
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
    req.body.user = req.user.id
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
});

// Get all product
exports.getAllProducts=asyncError(async(req,res,next)=>{
    // return next(new ErrorHandler("this is my temp error",500));
    const productPerPage=8;
    const productsCount= await Product.countDocuments();

    const apiFeatures=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    // .pagination(productPerPage);
    let products=await apiFeatures.query;
    let filteredProductsCount=products.length;
    apiFeatures.pagination(productPerPage)
    products=await apiFeatures.query.clone();
    res.status(200).json({success:true,
        products,
        productsCount,
        productPerPage,
        filteredProductsCount,
      });
}
)

// Get Product detail
exports.detailProduct=asyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({success:true,
        product});
})

// Edit a product->Admin Only
exports.updateProducts=asyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({success:true,
        product});
})

//Delete Product->Admin Only
exports.deleteProduct=asyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    // Delete images from cloudinary
    for(let i=0;i<product.images.length;i++)
    {
      const result=await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    await product.deleteOne();
    res.status(200).json({success:true,
        message:"Product deleted successfully"});
})

 // Add or Update review
 exports.giveProductReview=asyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;

    const review={
      name:req.user.name,
      user:req.user._id,
      rating:Number(rating),
      comment
    }

    const product=await Product.findById(productId);
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
    if(isReviewed)
    {
      product.reviews.forEach(rev=>{
        if(rev.user.toString()===req.user._id.toString())
        {
          rev.rating=rating,
          rev.comment=comment
        }
      })
    }
    else
    {
      product.reviews.push(review);
      product.numOfReviews=product.reviews.length
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    })
    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })
  })

//   Get all reviews
  exports.getProductReviews=asyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
  });

//   Delete Review
exports.deleteReviews=asyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
    let avg=0;
    reviews.forEach(rev=>{
        avg+=rev.rating
    })

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
      } else {
        ratings = avg / reviews.length;
      }
    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews}
    ,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
  }); 

  // Get all product Admin
exports.getAdminProducts=asyncError(async(req,res,next)=>{
  const products= await Product.find();

  res.status(200).json({success:true,
      products,
    });
}
)