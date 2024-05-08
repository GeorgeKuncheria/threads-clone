import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, getPost , deletePost, likeUnlikePost, replyToPost, getFeedPosts } from './../controllers/postController.js';
import express from 'express';



const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get('/:id',getPost)
router.post('/create',protectRoute,createPost)
router.delete('/delete/:id',protectRoute,deletePost)
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);



export default router;