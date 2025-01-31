// import React, { useEffect, useState } from 'react';
// import PostCard from './PostCard';
// import NewPosts from './NewPosts';
// import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const PostPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Replace with your backend URL
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/posts');
//         if (response.ok) {
//           const data = await response.json();
//           setPosts(data);  // Set the posts data from the response
//         } else {
//           console.error('Failed to fetch posts');
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className='h-full w-full' style={{ background: 'radial-gradient(circle,#8FD14F,beige)' }}>
//       <div className="w-[1160px] h-full ml-[140px] p-4">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <PostCard key={post._id} post={post} />  // Assuming each post has a unique _id
//           ))
//         ) : (
//           <p>No posts available</p>
//         )}
//       </div>
//       <Link to="/newposts">
//         <button
//           className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gray-500 text-white text-3xl font-bold flex items-center justify-center shadow-lg hover:bg-black transition-colors duration-200"
//           aria-label="Add New Post">
//           +
//         </button>
//       </Link>
//       <Routes>
//         <Route path="/NewPosts" element={<NewPosts />} />
//       </Routes>
//     </div>
//   );
// };

// export default PostPage;



import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
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