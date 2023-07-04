const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const errorMiddleWare=require('./middleware/error');

//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use("/api/v1",product);
app.use('/api/v1',user);

// Middleware for error
app.use(errorMiddleWare);

module.exports=app;