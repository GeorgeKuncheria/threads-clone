import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';

import initialize from './app.js';




dotenv.config();

const app=express();
connectDB();

const port=process.env.PORT;


initialize(app);


app.listen(port,()=>{console.log(`App is listening on ${port}`)});

