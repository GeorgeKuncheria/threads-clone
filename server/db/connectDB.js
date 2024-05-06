import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

//
// const conn= await mongoose.connect(process.env.MONGO_DB,{
//     useUnifiedTopology:true
// });

const connectDB =async () =>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_DB);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

// const connectDB = async (app) =>{
//     app.use(cors());
//     app.use(express.json());
//     app.use(express.urlencoded({extended:true}));
//     app.use(cookieParser());
//     const conn=await mongoose.connect(process.env.MONGO_DB);
//     console.log(`MongoDB Connected : ${conn.connection.host}`);
// }


export default connectDB;