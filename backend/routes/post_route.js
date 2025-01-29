import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post_controller";

const router = express.Router();
router.route("/NewPosts").post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/Posts").get(isAuthenticated,getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/comment/all").get(isAuthenticated, getCommentsOfPost);

export default router;
