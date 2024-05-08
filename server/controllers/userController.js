import User from './../models/userModel.js';
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';



export const getUserProfile = async (req,res) => {
    const {username}= req.params;
    try{
        const user= await User.findOne({username}).select("-password").select("-updatedAt").exec();
        if (!user){
            return res.status(400).json({message: "User not found!!"});
        }

        res.status(200).json(user);

    }

    catch(error){
        res.status(500).json({message:error.message});
        console.log(`Error in getUser: ${error.message}`);
        }
}



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
            return res.status(401).json({message:"Invalid  username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            message:"Successfully logged in",
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
        const {id} = req.params;
        const userToModify = await User.findById(id).exec();
        const currentUser = await User.findById(req.user._id).exec();

        if (id === req.user._id.toString()){
            return res.status(400).json({message:"User cannot follow themselves"});
        }

        if (!userToModify || !currentUser) {
            return res.status(404).json({message:"User not found"});
        }


        const isFollowing= currentUser.following.includes(id);

        if (isFollowing){
            await User.findByIdAndUpdate(id,{$pull:{followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following: id}});

            res.status(200).json({message:"User Unfollowed successfully"});
        }
        else{

            await User.findByIdAndUpdate(id,{$push:{followers: req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$push:{following: id}});
            res.status(200).json({message:"User Followed successfully"});

        }



    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log(`Error in followUnFollowUser: ${error.message}`);
    }
}



export const updateUser = async (req, res) => {
    const {username,email,password,name,profilePic,bio}= req.body;
    const userId= req.user._id;
    try{
        let user = await User.findById(userId);
        if (!user){
            return res.status(404).json({message:"User not found"});
        }


        if (req.params.id !== userId.toString()){
            return res.status(404).json({message:"Cannot update other user's profile" });
        }


        if (password){
            const salt= await bcrypt.genSalt(10);        
            const hashedPassword= await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }


        user.name= name || user.name;
        user.username= username || user.username;
        user.email= email || user.email;
        user.bio= bio || user.bio;
        user.profilePic= profilePic || user.profilePic;


        user=await  user.save();

        res.status(200).json({message:"Profile Updated successfully",user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log(`Error in updateUser: ${error.message}`);
    }
}



