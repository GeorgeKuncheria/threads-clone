import express from 'express';
import { signupUser , loginUser, logoutUser, followUnFollowUser, updateUser , getUserProfile,getSuggestedUser,freezeAccount } from '../controllers/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';



const router=express.Router();


router.get("/profile/:query",getUserProfile);
router.post("/signup",signupUser);
router.get("/suggested",protectRoute,getSuggestedUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/follow/:id",protectRoute,followUnFollowUser);
router.put("/update/:id",protectRoute,updateUser);
router.put("/freeze",protectRoute,freezeAccount);



export default router