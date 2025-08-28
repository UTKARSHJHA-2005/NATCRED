import React, { useEffect, useState } from 'react';
import {PostCard} from './PostCard';
import NewPosts from './NewPosts';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './PostPage.css';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
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