const Order=require('../models/orderModels')
const Product=require('../models/productModels');
const ErrorHandler = require('../utils/errorHandler');
const asyncError=require('../middleware/asyncError');

// Create new Order
exports.newOrder=asyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice}=req.body;

        const order=await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id,
        });

        res.status(200).json({
            success:true,
            order
        });
});

// get Single Order
exports.getSingleOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email");

    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404));
    }

    res.status(200)
.json({
    success:true,
    order,
});
});

// get logged in user Orders
exports.myOrders=asyncError(async(req,res,next)=>{
    const order=await Order.find({user:req.user._id}).populate("user","name email");

    res.status(200)
.json({
    success:true,
    order,
});
});

// get All Orders-Admin
exports.getAllOrder=asyncError(async(req,res,next)=>{
    const orders=await Order.find()
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });
    res.status(200)
.json({
    success:true,
    totalAmount,
    orders,
});
});

// update order status-Admin
exports.updateOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404));
    }
    if(order.orderStatus==="Delivered")
    {
        return next(new ErrorHandler("You have already delivered",400))
    }

    order.orderItems.forEach(async(ord)=>{
        await updateStock(ord.product,ord.quantity);
    })

    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered")
    {
        order.deliveredAt=Date.now();
    }

    await order.save({validateBeforeSave:false});
    res.status(200)
.json({
    success:true,
});
});

async function updateStock(id,quantity){
    const product =await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}

// delete Order-Admin
exports.deleteOrder=asyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler("Order not found with this id",404));
    }
    await order.deleteOne();
    res.status(200)
.json({
    success:true,
});
});