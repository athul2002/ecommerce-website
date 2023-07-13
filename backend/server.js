const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
const cloudinary=require('cloudinary');
dotenv.config({path:"backend/config/config.env"})

process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");

    server.close(()=>{
        process.exit(1);
    })    
})

//connecting to database
connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started in port ${process.env.PORT}`);
})
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");

    server.close(()=>{
        process.exit(1);
    })
})