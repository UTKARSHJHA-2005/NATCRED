import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const PostCard = ({ post }) => {
  console.log(post)
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
      setHasLiked(true);
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setDislikes(dislikes - 1);
      setHasDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
      setHasDisliked(true);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div data-aos='fade-right' className="bg-green-800 mt-[10px] shadow-lg text-white rounded-lg p-4 mb-[50px]">
      <div data-aos='flip-up' className="flex mb-2">
        <img src={post.authorAvatar} alt="Author" className="w-10 h-13 rounded-full mr-3" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{post.author}</h3>
          <p className="text-sm text-gray-800">{post.date}</p>
        </div>
      </div>
      {post.image && (
        <div data-aos='zoom-out' className="mb-4">
          <img src={post.image} alt="Post" className="w-full h-60 object-cover rounded-lg" />
        </div>
      )}
      <p data-aos='zoom-in' className="mb-4">{post.content}</p>
      <div data-aos='fade-down' className="flex space-x-4 mb-4">
        <button onClick={handleLike} className="flex items-center space-x-1">
          <span>👍</span>
          <span>{likes}</span>
        </button>
        <button onClick={handleDislike} className="flex items-center space-x-1">
          <span>👎</span>
          <span>{dislikes}</span>
        </button>
      </div>
      <div data-aos='fade-down' className="border-t border-gray-900 pt-3">
        <h4 className="text-md text-white font-semibold mb-2">Comments</h4>
        {comments.map((comments, index) => (
          <div key={index} className="text-white flex items-center mb-2">
          <img src={comments.avatar} alt={comments.name} className="text-white w-8 h-8 rounded-full mr-2" />
          <div>
            <span className="font-bold text-white">{comments.name}: </span>
            <span className="text-white">{comments.text}</span>
          </div>
        </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="mt-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 bg-gray-600 rounded-md text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default PostCard;
