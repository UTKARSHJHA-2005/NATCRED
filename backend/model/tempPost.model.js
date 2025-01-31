import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/147072811?v=4',
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      name: String,
      avatar: String,
      text: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
