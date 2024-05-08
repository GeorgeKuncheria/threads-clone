import Post from './../models/postModel.js';
import User from './../models/userModel.js';

export const createPost = async (req, res) =>{
    try{

        const {postedBy,text,img}= req.body;
        

        if (!postedBy || !text){
            return res.status(400).json({message:"PostedBy and text fields are required!!"});
        }

        const user= await User.findById(postedBy);

        if (!user){
            return res.status(401).json({message:"User does not exist!!"});
        }

        if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
            
		}


        const maxLength= 500;

        if (text.length > maxLength) {
            return res.status(400).json({message:`Text must be  less than ${maxLength}`});
        }


        const post = new Post({postedBy,text,img});
        await post.save();


        res.status(200).json({message:"Post saved successfully",post,username:user.username});


        
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log(`Error in createPost: ${error.message}`);
    }
}




export const  getPost = async (req,res) =>{
    try{

        const {id}= req.params;
        const post = await Post.findById(id).exec();

        console.log(post.postedBy.toString());
        console.log(req.user._id.toString());


        if (post.postedBy.toString() !==req.user._id.toString()){
            return res.status(401).json({message:"User unauthorized."});
        }

        if (!post){
            return res.status(404).json({message:"Post doesn't exist"});
        }

        res.status(200).json({message:"Post found",post});

       
    }

    catch(error){

        res.status(500).json({message:error.message});
        console.log(`Error in getPost: ${error.message}`);
    }
}



export const updatePost = async (req,res)=>{
    try {

    }
    catch(error){
        
    }
}