import { protectRoute } from "../middleware/protectRoute.js";
import {createPost, getPost } from './../controllers/postController.js';
import express from 'express';



const router = express.Router();


router.get('/:id',protectRoute,getPost)
router.post('/create',protectRoute,createPost)



export default router;