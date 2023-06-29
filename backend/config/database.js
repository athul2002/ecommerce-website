const mongoose=require("mongoose");
// const dotenv=require('dotenv');

// dotenv.config({path:"backend/config/config.env"})

const connectDatabase=()=>{

    const uri=process.env.ATLAS_URI;
    mongoose.connect(uri);
    const connection=mongoose.connection;
    connection.once('open',()=>{
        console.log("mongoose connection successful");
    })
    
}
module.exports=connectDatabase;
