import Post from './../models/postModel.js';
import User from './../models/userModel.js';

export const createPost = async (req, res) =>{
    try{

        const {postedBy,text,img}= req.body;
        

        if (!postedBy || !text){
            return res.status(400).json({error:"PostedBy and text fields are required!!"});
        }

        const user= await User.findById(postedBy);

        if (!user){
            return res.status(401).json({error:"User does not exist!!"});
        }

        if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
            
		}


        const maxLength= 500;

        if (text.length > maxLength) {
            return res.status(400).json({error:`Text must be  less than ${maxLength}`});
        }


        const post = new Post({postedBy,text,img});
        await post.save();


        res.status(200).json({message:"Post saved successfully",post,username:user.username});


        
    }
    catch(error){
        res.status(500).json({error: error.message});
        console.log(`Error in createPost: ${error.message}`);
    }
}




export const  getPost = async (req,res) =>{
    try{

        const {id}= req.params;
        const post = await Post.findById(id).exec();



        if (!post){
            return res.status(404).json({error:"Post doesn't exist"});
        }

        res.status(200).json({message:"Post found",post});

       
    }

    catch(error){

        res.status(500).json({error:error.message});
        console.log(`Error in getPost: ${error.message}`);
    }
}


export const deletePost = async (req,res)=>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);

        if (!post){
            return res.status(404).json({error:"Post doesn't exist"});
        }

        if (post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({error:"Unauthorized to delete the post"});
        }

        const deletedPost= await Post.findByIdAndDelete(id);

        res.status(200).json({message:"Post has been deleted successfully"});

        

    }
    catch(error){
        res.status(500).json({error:error.message});
        console.log(`Error in deletePost:  ${error.message}`);

    }
}



export const likeUnlikePost = async (req, res) => {
	try {
		const { id: postId } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			post.likes.push(userId);
			await post.save();
			res.status(200).json({ message: "Post liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const replyToPost = async (req, res) => {
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const reply = { userId, text, userProfilePic, username };

		post.replies.push(reply);
		await post.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};