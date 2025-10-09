// This is the page where postcards are assembled.
import React, { useEffect, useState } from 'react';// React
import {PostCard} from './PostCard';// PostCard
import NewPosts from './NewPosts';// NewPosts Page
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Routing
import './PostPage.css';// Styling

const PostPage = () => {
  const [posts, setPosts] = useState([]);// Posts State
  // Fetching Posts from DB.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://natcred-1.onrender.com/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-page-container">
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="no-posts-message">
            <span className="neon-text">No posts available</span>
            <div className="scanline"></div>
          </div>
        )}
      </div>
      {/* New Post Button */}
      <Link to="/newposts" className="new-post-button">
        <div className="button-glow"></div>
        <span className="button-plus">+</span>
      </Link>
      <Routes>
        <Route path="/NewPosts" element={<NewPosts />} />
      </Routes>
    </div>
  );
};

export default PostPage;
