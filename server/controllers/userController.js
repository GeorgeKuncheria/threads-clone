import User from './../models/userModel.js';
import bcrypt from 'bcryptjs'

export const signupUser= async (req,res)=>{
    try{
        const {name,email,password,username}=req.body;
        const user= await User.findOne({$or:[{email},{username}]});

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