import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from  'cloudinary';
import initialize from './app.js';
import {app,server,io} from './socket/socket.js';
import job from './cron/cron.js';

import path from 'path';





dotenv.config();


connectDB();
job.start();

const port=process.env.PORT;
const _dirname=path.resolve();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


initialize(app);

//configuring backend and frontend in same URL;
//http://localhost:3000 => backend server,frontend client  
//http://localhost:5173 => frontend client 


if (process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(_dirname,"/client/dist")))


    //basically our react app
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
    })
}




server.listen(port,()=>{console.log(`App is listening on ${port}`)});

