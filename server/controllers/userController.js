import User from './../models/userModel.js';
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

export const signupUser= async (req,res)=>{
    try{
        const {name,email,password,username}=req.body;
        const user= await User.findOne({$or:[{email},{username}]}).exec();

        if (user){
            return res.status(400).json({message:"User already exists!!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const newUser =  new User({
            name,
            username,
            email,
            password:hashedPassword

        });

        await newUser.save();

        if (newUser){
            generateTokenAndSetCookie(newUser._id,res);
            res.status(200).json({
                _id:newUser._id,
                name:newUser.name,
                username:newUser.username,
                email:newUser.email
            })
        }

        else{
            res.status(400).json({message:"Invalid User Data"})
        }

    }
    catch(err){
        res.status(500).json({message:err.message});
        console.log("Error in signUser:",err.message);
    }
}


export const loginUser = async (req,res) => {
    try{
        const {username,password}=req.body;
        const user= await User.findOne({ username }).exec();

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect)
        {
            res.status(401).json({message:"Invalid  username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        });

    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error in loginUser:",error.message);
    }
}



export const logoutUser = async (req,res) => {
    try{
        res.cookie("JWT","",{maxAge:1});
        res.status(200).json({message:"User Logged out successfully!!"}); 
        }
    catch(error){
        res.status(500).json({message:error.message})
        console.log(`Error in logoutUser: ${error.message}`)
    }
}


export const followUnFollowUser= async (req,res) => {
    try{
        

    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log(`Error in followUnFollowUser: ${error.message}`);
    }
}