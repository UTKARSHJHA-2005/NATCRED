// This is the page where user creates the posts.
import { useState, useEffect } from 'react';// React
import { Upload, User, FileText, Wand2, Send, Camera, Edit3 } from 'lucide-react';// Icon
import { useAuth } from '../AuthContext';// Authentication
import axios from 'axios';// Axios
import { ToastContainer, toast } from 'react-toastify';

const NewPosts = () => {
  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const { user } = useAuth()// User authentication
  const [isGenerating, setIsGenerating] = useState(false);// AI generation state
  const [isPublishing, setIsPublishing] = useState(false);// Publishing state
  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    author: user?.name,
    authorAvatar: user?.image,
  })
  // Handle form changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(formData);
  };
  // Handle image upload
  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const uploadData = new FormData();
      uploadData.append("image", file);
      const res = await axios.post("https://natcred-1.onrender.com/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded:", res.data);
      setFormData((prev) => ({ ...prev, image: res.data.url }));
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle post publishing
  const handlePublishPost = async () => {
    if (!formData.image) {
      toast.apply("Please upload an image");
      return;
    }
    if (!formData.content.trim()) {
      toast.apply("Please enter some content for the post.");
      return;
    }
    try {
      await axios.post("https://natcred-1.onrender.com/api/posts", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast.success("Posts published successfully!");
      setFormData({
        image: "",
        title: "",
        content: "",
        author: user?.name,
        authorAvatar: user?.image,
      })
    } catch (err) {
      console.log("Posts error:", err)
    } finally {
      setIsPublishing(false);
    }
  };

  // Some fields should be filled if the user is logged in
  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({ ...prev, author: user.name, authorAvatar: user.image }));
    }
  }, [user]);

  // Handle Generating AI Response
  const GenerateAI = async () => {
    if (!formData.content.trim()) {
      toast.info("Ask something or write a base idea first");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("https://natcred-1.onrender.com/api/generate",
       {
          prompt: formData.content,
          userId: user?.id || user?.email
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
        // method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({
        //   prompt: `Expand and improve this content in a professional and engaging way:\n\n${formData.content}`
        // })
      );

      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          content: data.content
        }));
      } else {
        toast.error("AI generation failed. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error("AI service error. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#172a45] p-4 md:p-8">
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Create Magic
            </h1>
          </div>
        </div>
        {/* Main Content Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 shadow-2xl border border-[#00ff88e5]">
          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
              <Camera className="w-5 h-5 text-purple-400" />
              Featured Image
            </label>
            <div className="group relative w-full h-64 md:h-80 bg-[#9bf7cce5] rounded-2xl border-2 border-dashed border-[#00ff88e5] hover:border-[#00ff8823] transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => document.getElementById('imageInput').click()}>
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-black items-center justify-center h-full transition-colors">
                  <Upload className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xl font-semibold">Click to upload image</span>
                </div>
              )}
            </div>
            <input id="imageInput" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </div>
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Title Input */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                <FileText className="w-5 h-5 text-blue-400" />
                Post Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter an engaging title..."
                className="w-full p-4 bg-slate-800/50 border border-[#00ff88e5] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-800/70"
              />
            </div>
            {/* Author Input */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                <User className="w-5 h-5 text-green-400" />
                Author Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                placeholder="Your name or pen name..."
                className="w-full p-4 bg-slate-800/50 border border-[#00ff88e5] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-800/70"
              />
            </div>
            {/* Content Textarea with AI Button */}
            <div className="group">
              <label className="flex items-center gap-2 text-lg font-semibold text-white mb-3">
                <Edit3 className="w-5 h-5 text-pink-400" />
                Content
              </label>
              <div className="relative">
                <textarea
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Share your thoughts, ideas, or ask AI to help you create something amazing..."
                  className="w-full h-48 p-4 bg-slate-800/50 border border-[#00ff88e5] rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-slate-800/70 resize-none"
                />
                {/* AI Generate Button */}
                <button onClick={GenerateAI} disabled={isGenerating} className="absolute top-3 right-3 p-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-800 disabled:to-pink-800 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-purple-500/25"
                  title="Generate AI content">
                  {isGenerating ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Wand2 className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Publish Button */}
          <div className="mt-8 pt-8 border-t border-slate-600/50">
            <button onClick={handlePublishPost} disabled={isPublishing} className="group relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 disabled:from-slate-600 disabled:via-slate-700 disabled:to-slate-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-purple-500/25 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {isPublishing ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    Publish to the World
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewPosts;
