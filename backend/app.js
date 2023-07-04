const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const errorMiddleWare=require('./middleware/error');

//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order=require('./routes/orderRoute');

app.use("/api/v1",product);
app.use('/api/v1',user);
app.use('/api/v1',order);

// Middleware for error
app.use(errorMiddleWare);

module.exports=app;