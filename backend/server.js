const app=require('./app');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database')
dotenv.config({path:"backend/config/config.env"})

process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");

    server.close(()=>{
        process.exit(1);
    })    
})

//connecting to database
connectDatabase()
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