import React, { useState } from 'react';
import AI from '../assets/AI.webp';
import { AI_Prompt, chatSession } from '../AIModal';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const NewPosts = () => {
  const [image, setImage] = useState(null); // Stores the file
  const [imagePreview, setImagePreview] = useState(null); // Stores preview URL
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); // Stores the author's name
  const [title, setTitle] = useState(''); // Stores the post title
  const navigate = useNavigate();

  // Handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the actual file
      setImagePreview(URL.createObjectURL(file)); // Store preview URL
    }
  };

  // Handle form submission
  const handlePublishPost = async () => {
    if (!image) {
      alert('Please upload an image');
      return;
    }
    if (!content.trim()) {
      alert('Please enter some content for the post.');
      return;
    }
    if (!author.trim()) {
      alert('Please enter the author name.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a title for the post.');
      return;
    }
  
    // Assuming the authorAvatar can be an empty string or null if not available.
    const authorAvatar = ''; // Set this to the URL or path of the avatar image if available
  
    const formData = new FormData();
    formData.append('image', image); // Use the actual file
    formData.append('content', content);
    formData.append('author', author);
    formData.append('title', title);
    formData.append('authorAvatar', authorAvatar); // Add the authorAvatar field
  
    try {
      const response = await Axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the request has the correct content type
        }
      });
  
      console.log('Post Response:', response.data);
      alert('Post published successfully!');
  
      // Reset states after successful upload
      setImage(null);
      setImagePreview(null);
      setContent('');
      setAuthor('');
      setTitle('');
  
      navigate("/posts");
    } catch (error) {
      console.error('Error publishing post:', error.response?.data || error.message);
      alert('Failed to publish post. Please try again.');
    }
  };
  

  // Generate AI-based content
  const GenerateAI = async () => {
    if (!content) {
      alert('Ask what you want');
      return;
    }
    try {
      const FINAL_PROMPT = AI_Prompt.replace('{content}', content);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const generatedText = result?.response?.text() || '';

      console.log("Generated AI Content:", generatedText);
      setContent(generatedText);
    } catch (error) {
      console.error('Error generating AI content:', error.message);
      alert('Failed to generate AI content. Please try again.');
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-8"
         style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}>
      <h2 className="text-3xl font-bold mb-8">Create a New Post</h2>

      {/* Image Upload Section */}
      <div className="w-full max-w-2xl h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4 cursor-pointer"
           onClick={() => document.getElementById('imageInput').click()}>
        {imagePreview ? (
          <img src={imagePreview} alt="Uploaded"
               className="object-cover w-full h-full rounded-lg" />
        ) : (
          <span className="text-xl font-semibold">Upload Image</span>
        )}
      </div>
      <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Post Title */}
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full p-4 bg-gray-700 rounded-lg text-white" />
      </div>

      {/* Author Name */}
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          className="w-full p-4 bg-gray-700 rounded-lg text-white" />
      </div>

      {/* Post Content */}
      <div className="relative w-full max-w-2xl mb-4">
        <textarea value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="Post Content"
                  className="w-full h-40 p-4 bg-gray-700 rounded-lg text-white resize-none" />
        <img src={AI} onClick={GenerateAI} title='Ask AI'
             alt="AI Icon"
             className="absolute bg-white rounded-full top-2 right-2 h-6 w-6 cursor-pointer hover:animate-bounce" />
      </div>

      {/* Publish Button */}
      <button onClick={handlePublishPost}
              className="w-full max-w-2xl py-3 bg-green-200 text-black rounded-lg font-bold text-xl hover:bg-green-600 transition-all">
        Publish Post
      </button>
    </div>
  );
};

export default NewPosts;
