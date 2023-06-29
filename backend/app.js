const express=require('express');
const app=express();
app.use(express.json())
const errorMiddleWare=require('./middleware/error');
//Route imports
const product = require('./routes/productRoute');
app.use("/api/v1",product);
// Middleware for error
app.use(errorMiddleWare);

module.exports=app;