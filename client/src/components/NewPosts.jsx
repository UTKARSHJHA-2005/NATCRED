import React, { useState } from 'react';
import AI from '../assets/AI.webp';
import { AI_Prompt,chatSession } from '../AIModal';

const NewPosts = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePublishPost = () => {
    if(!image){
      alert('Please upload an image');
      return;
    }
    if (!content.trim()) {
      alert('Please enter some content for the post.');
      return;
    }
    console.log('Publishing post:', { image, content });
    alert('Post published successfully!');
    setImage(null);
    setContent('');
  };
  const GenerateAI = async () => {
    if (!content) {
        alert('Ask what you want');
        return;
    }
    try {
        const FINAL_PROMPT = AI_Prompt
            .replace('{content}', content)
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setContent(result?.response?.text())
    } catch (error) {
        console.error('Error generating trip:', error.message);
        alert('Failed to generate trip. Please try again.');
    }
};

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center p-8"
      style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}
    >
      <h2 className="text-3xl font-bold mb-8">Create a New Post</h2>
      <div
        className="w-full max-w-2xl h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4 cursor-pointer"
        onClick={() => document.getElementById('imageInput').click()}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-xl font-semibold">Upload Image</span>
        )}
      </div>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="relative w-full max-w-2xl mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          className="w-full h-40 p-4 bg-gray-700 rounded-lg text-white resize-none"
        />
        <img
          src={AI} onClick={GenerateAI} title='Ask AI'
          alt="AI Icon"
          className="absolute bg-white rounded-full top-2 right-2 h-6 w-6 cursor-pointer hover:animate-bounce"
        />
      </div>
      <button
        onClick={handlePublishPost}
        className="w-full max-w-2xl py-3 bg-green-200 text-black rounded-lg font-bold text-xl hover:bg-green-600 transition-all"
      >
        Publish Post
      </button>
    </div>
  );
};

export default NewPosts;
