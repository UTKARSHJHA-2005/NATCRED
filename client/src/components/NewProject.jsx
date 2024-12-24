import React, { useState } from 'react';

const NewProject = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePublishPost = () => {
    if (!content.trim()) {
      alert('Please enter some content for the project.');
      return;
    }
    console.log('Publishing project:', { image, content });
    alert('Project published successfully!');
    setImage(null);
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold mb-8">Publish a new Project</h2>
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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
        className="w-full max-w-2xl h-40 p-4 bg-gray-600 rounded-lg text-white mb-4 resize-none"
      ></textarea>
      <button
        onClick={handlePublishPost}
        className="w-full max-w-2xl py-3 bg-green-200 text-black rounded-lg font-bold text-xl hover:bg-green-600 transition-all">
        Publish Project
      </button>
    </div>
  );
};

export default NewProject;