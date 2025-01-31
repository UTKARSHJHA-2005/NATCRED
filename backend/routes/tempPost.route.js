import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/tempPost.controller.js";
import upload from "../middlewares/multers.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", upload.single("image"), createPost); // Handle image upload
router.delete("/:id", deletePost);

export default router;
