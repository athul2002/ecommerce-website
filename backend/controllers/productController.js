const Product=require('../models/productModels');
const ErrorHandler = require('../utils/errorHandler');
const asyncError=require('../middleware/asyncError');
const ApiFeatures = require('../utils/apiFeatures');

// Create Product ->Admin only
exports.createProduct=asyncError(async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
});

// Get all product
exports.getAllProducts=asyncError(async(req,res)=>{
    const apiFeatures=new ApiFeatures(Product.find(),req.query).search();
    const products=await apiFeatures.query;

    res.status(200).json({success:true,
        products});
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
    await product.deleteOne();
    res.status(200).json({success:true,
        message:"Product deleted successfully"});
})
