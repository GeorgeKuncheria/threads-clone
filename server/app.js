import initializeRoutes from './routes/index.js';
import cookieParser from 'cookie-parser';
import express from 'express';



const initialize= (app) =>{


    app.use(express.json()); // to  parse the JSON data in the req.body
    app.use(express.urlencoded({extended:true}));  // To parse form data in the req.body
    app.use(cookieParser());


    initializeRoutes(app);

}


export default initialize;
