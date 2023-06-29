const Product=require('../models/productModels');
// Create Product ->Admin only
exports.createProduct=async(req,res,next)=>{
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

// Get all product
exports.getAllProducts=async(req,res)=>{
    const products=await Product.find();

    res.status(200).json({success:true,
        products});
}
// Get Product detail
exports.detailProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({success:true,
        product});
}
// Edit a product->Admin Only
exports.updateProducts=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({success:true,
        product});
}

//Delete Product->Admin Only
exports.deleteProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    await product.deleteOne();
    res.status(200).json({success:true,
        message:"Product deleted successfully"});
}