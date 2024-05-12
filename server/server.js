import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from  'cloudinary';
import initialize from './app.js';





dotenv.config();

const app=express();
connectDB();

const port=process.env.PORT;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


initialize(app);


app.listen(port,()=>{console.log(`App is listening on ${port}`)});

