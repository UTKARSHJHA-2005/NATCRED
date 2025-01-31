import Post from "../model/tempPost.model.js";
import cloudinary from "../utils/cloudinary.js"; // Cloudinary instance

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const formattedPosts = posts.map(post => ({
      author: post.author,
      authorAvatar: post.authorAvatar,
      date: post.createdAt.toISOString(),
      image: post.image, // URL from Cloudinary
      content: post.content,
      likes: post.likes || 0,
      dislikes: post.dislikes || 0,
      comments: post.comments || [],
    }));
    res.status(200).json(formattedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching posts" });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
export const createPost = async (req, res) => {
  try {
    const { content, author, authorAvatar, likes, dislikes, comments } = req.body;

    if (!req.file || !content || !author) {
      return res.status(401).json({ message: "Image, content, and author are required." });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts", 
      resource_type: "auto", 
    });

    // Create new post with the URL from Cloudinary
    const newPost = new Post({
      image: result.secure_url,  // Store the URL from Cloudinary
      content,
      author,
      authorAvatar,
      likes: likes || 0,
      dislikes: dislikes || 0,
      comments: comments || [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while creating post" });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting the post" });
  }
};
