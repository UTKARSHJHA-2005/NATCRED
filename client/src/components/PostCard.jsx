// This is the card for the posts.
import React, { useState, useEffect } from 'react';// React
import AOS from 'aos';// Animation
import 'aos/dist/aos.css';
import { Heart, MessageCircle, Share, ThumbsUp, ThumbsDown, Send, MoreHorizontal } from "lucide-react"// Icons
import axios from 'axios';// Axios
import { useAuth } from '../AuthContext';// Authentication
import { ToastContainer, toast } from 'react-toastify';// Pop-ups

export const PostCard = ({ post }) => {
  console.log(post)
  const { user } = useAuth()// User Auth
  const [likes, setLikes] = useState(post.likes);// Likes State
  const [dislikes, setDislikes] = useState(post.dislikes);// Dislikes State
  const [comments, setComments] = useState(post.comments || []);// Comments State
  const [hasLiked, setHasLiked] = useState(
    post.likedBy?.includes(user?.id) || false
  );// Liked or Not
  const [hasDisliked, setHasDisliked] = useState(
    post.dislikedBy?.includes(user?.id) || false
  );// Disliked or Not
  const [newComment, setNewComment] = useState(""); //New Comment State

  // Like handler
  const handleLike = async () => {
    if (!user) return toast.info("Login first!");
    try {
      const { data } = await axios.post(
        `https://natcred-1.onrender.com/api/posts/${post._id}/like`,
        { userId: user.id }
      );
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setHasLiked(data.likedBy.includes(user.id));
      setHasDisliked(data.dislikedBy.includes(user.id));
    } catch (err) {
      console.error(err);
    }
  };

  // Dislike handler
  const handleDislike = async () => {
    if (!user) return toast.info("Login first!");
    try {
      const { data } = await axios.post(
        `https://natcred-1.onrender.com/api/posts/${post._id}/dislike`,
        { userId: user.id }
      );
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setHasLiked(data.likedBy.includes(user.id));
      setHasDisliked(data.dislikedBy.includes(user.id));
    } catch (err) {
      console.error(err);
    }
  };

  // Comment handler
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const newCommentObj = {
        name: user?.name || "Anonymous",
        avatar: user?.image || "https://placehold.co/40",
        text: newComment.trim(),
      };
      const { data } = await axios.post(
        `https://natcred-1.onrender.com/api/posts/${post._id}/comment`,
        newCommentObj
      );
      setComments(data.comments);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };
  // Animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-8xl">
        {/* Main Post Card */}
        <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Post Header */}
          <div className="p-6 border-b border-slate-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img src={post.authorAvatar} alt="Author" className="w-14 h-14 rounded-full border-3 border-gradient-to-r from-purple-400 to-pink-400 p-0.5 object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white hover:text-purple-300 cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  <h3 className="text-xl font-bold text-white hover:text-purple-300 cursor-pointer transition-colors">
                    {post.author}
                  </h3>
                  <p className="text-slate-400 text-sm flex items-center space-x-2">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Follow</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row">
            {/* LEFT SIDE - Post content */}
            <div className="lg:w-2/3 p-6">
              {post.image && (
                <div className="mb-6 relative group">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-80 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="space-y-6">
                <p className="text-slate-100 text-lg leading-relaxed">
                  {post.content}
                </p>
                {/* Engagement Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                  <div className="flex items-center space-x-6">
                    <button onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${hasLiked
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300'
                        }`}>
                      <ThumbsUp className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{likes}</span>
                    </button>
                    <button onClick={handleDislike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${hasDisliked
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-red-500/20 hover:text-red-300'
                        }`}>
                      <ThumbsDown className={`w-5 h-5 ${hasDisliked ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{dislikes}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{comments.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE - Comments */}
            <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-slate-700/30 bg-slate-800/30">
              <div className="p-6 h-full flex flex-col">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span>Comments ({comments.length})</span>
                </h4>
                {/* Comments List */}
                <div className="flex-1 space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {comments.map((comment, index) => (
                    <div key={index} className="flex space-x-3 p-3 rounded-xl bg-slate-700/20 hover:bg-slate-700/30 transition-colors">
                      <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full border-2 border-slate-600 flex-shrink-0 object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="bg-slate-600/50 rounded-2xl p-3">
                          <span className="font-bold text-purple-300 text-sm">{comment.name}</span>
                          <p className="text-slate-200 text-sm mt-1 leading-relaxed">{comment.text}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400">
                          <button className="hover:text-purple-300 transition-colors">Like</button>
                          <button className="hover:text-purple-300 transition-colors">Reply</button>
                          <span>5m</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Comment Input */}
                <div className="mt-6 pt-4 border-t border-slate-700/30">
                  <div className="flex space-x-3">
                    <img src={user?.image} alt="You" className="w-10 h-10 rounded-full border-2 border-slate-600 object-cover" />
                    <div className="flex-1 relative">
                      <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a thoughtful comment..."
                        className="w-full p-4 pr-12 bg-slate-700/50 rounded-2xl text-white placeholder-slate-400 border border-slate-600/50 focus:border-purple-500 focus:outline-none transition-all duration-300"
                        onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(e)} />
                      <button onClick={handleCommentSubmit} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-purple-500 text-white hover:bg-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!newComment.trim()}>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

