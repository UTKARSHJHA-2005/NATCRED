import Post from "../model/tempPost.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { image, title, content, author, authorAvatar, likes, dislikes, comments } = req.body;
    const newProject = new Post(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while creating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Post.findByIdAndDelete(id);
    if (!report) {
      throw new ErrorHandling('Post not found', 404);
    }
    return res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting the post" });
  }
};

export const LikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // If already liked → remove like
    if (post.likedBy.includes(userId)) {
      post.likedBy.pull(userId);
      post.likes -= 1;
    } else {
      // Add like
      post.likedBy.push(userId);
      post.likes += 1;

      // If previously disliked → remove dislike
      if (post.dislikedBy.includes(userId)) {
        post.dislikedBy.pull(userId);
        post.dislikes -= 1;
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const dislikePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // If user already disliked → remove dislike
    if (post.dislikedBy.includes(userId)) {
      post.dislikedBy = post.dislikedBy.filter(
        id => id && id.toString() !== userId  // ✅ avoid null crash
      );
      post.dislikes = Math.max(0, post.dislikes - 1);
    } else {
      // Add dislike
      post.dislikedBy.push(userId);
      post.dislikes += 1;

      // If user had liked before → remove like
      if (post.likedBy.includes(userId)) {
        post.likedBy = post.likedBy.filter(
          id => id && id.toString() !== userId  // ✅ safe filter
        );
        post.likes = Math.max(0, post.likes - 1);
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const commentPost=async(req,res)=>{
   try {
    const { name, avatar, text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { name, avatar, text };

    post.comments.push(newComment);
    await post.save();

    res.json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}