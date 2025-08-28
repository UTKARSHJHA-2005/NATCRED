import express from "express";
import { getPosts, createPost, deletePost, LikePost, dislikePost, commentPost } from "../controllers/tempPost.controller.js";
import upload from "../middlewares/multers.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost); 
router.delete("/:id", deletePost);
router.post("/:id/like", LikePost);
router.post("/:id/dislike", dislikePost);
router.post("/:id/comment", commentPost);

export default router;
