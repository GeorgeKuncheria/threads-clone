import User from './../models/userModel.js';
import jwt from 'jsonwebtoken';


export const protectRoute = async (req, res, next) => {
    try {

        const token= req.cookies.JWT;

        if (!token){
            res.status(401).json({message: 'Unauthorized access'});
        }


        const decoded = jwt.verify(token,process.env.JWT_SECRET);



        const user = await User.findById(decoded.userId).select("-password");  //.select("-password") indicates that you want to exclude the password file
        req.user = user; 


        next();

        

    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log(`Error in protected route: ${error.message}`);
    }
};