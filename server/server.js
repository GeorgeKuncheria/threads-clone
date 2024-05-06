import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';


import userRoutes from './routes/userRoutes.js';



dotenv.config();

const app=express();
connectDB();

const port=process.env.PORT;

app.use(express.json()); // to  parse the JSON data in the req.body
app.use(express.urlencoded({extended:true}));  // To parse form data in the req.body
app.use(cookieParser());


//Routes
app.use('/api/users',userRoutes);

app.listen(port,()=>{console.log(`App is listening on ${port}`)});

