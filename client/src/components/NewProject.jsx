// This si the page where user creates its own project.
import { useState, useEffect } from 'react';// React
import axios from 'axios';// Axios
import { Upload, Sparkles, Send, DollarSign, User, Award, FileText } from 'lucide-react';// Icons
import { useAuth } from '../AuthContext';// Authentication
import { ethers } from 'ethers';// Ethers
import CarbonCreditMarketABI from "../credit.json";//ABI 

const CONTRACT_ADDRESS = "0x9d8b6788D47f3478594f6F819410c7cdfFdB63F6";// Contract

const NewProject = () => {
  const { user } = useAuth()// User
  const [contract, setContract] = useState(null);// Contract Stae
  // Form Data State
  const [formData, setFormData] = useState({
    image: "",
    content: "",
    title: "",
    author: user?.name,
    Fund: "",
    CarbonCredits: "",
  })
  const [isGenerating, setIsGenerating] = useState(false);// Generation of AI State
  // Handle Change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("https://natcred-1.onrender.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    handleChange("image", res.data.url);
  };
  // Handle Publish Project
  const handlePublishPost = async () => {
    if (!formData.content.trim()) {
      alert("Please enter some content for the project.");
      return;
    }
    if (!formData.image) {
      alert("Please upload an image for the project.");
      return;
    }
    try {
      // Save project in DB
      await axios.post("https://natcred-1.onrender.com/api/project", formData, {
        headers: { "Content-Type": "application/json" }
      });
      // Make sure contract exists
      if (!contract) {
        alert("Smart contract not initialized!");
        return;
      }
      // Set prices on-chain
      const buyWei = ethers.parseEther((formData.Fund / formData.CarbonCredits).toString() || "0");
      const sellWei = ethers.parseEther((parseFloat(formData.Fund / formData.CarbonCredits) + 0.01).toString() || "0");
      const tx = await contract.setPrices(buyWei, sellWei);
      await tx.wait();
      alert("Project published successfully!");
      setFormData({
        image: "",
        content: "",
        title: "",
        author: "",
        Fund: "",
        CarbonCredits: "",
      });
    } catch (err) {
      if (err.response) {
        console.error("Server responded with error:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
    }
  };
  // Load Contract
  useEffect(() => {
    const loadContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const instance = new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditMarketABI, signer);
        setContract(instance);
      } else {
        console.error("MetaMask not found!");
      }
    };
    loadContract();
  }, []);
  // Generate AI
  const GenerateAI = async () => {
    if (!formData.content.trim()) {
      alert("Ask what you want");
      return;
    }
    setIsGenerating(true);
    try {
      const res = await axios.post(
        "https://natcred-1.onrender.com/api/generate",
        {
          prompt: formData.content,
          userId: user?.id || user?.email
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {
        handleChange("content", res.data.content);
      } else {
        alert(res.data.error || "AI generation failed");
      }
    } catch (error) {
      console.error("AI Generate Error:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[#172a45]"></div>
      <div className="relative z-10 flex flex-col items-center p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl font-semibold text-white/90">
            Publish Your Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
        <div className="w-full max-w-4xl space-y-8">
          {/* Image Upload Section */}
          <div className=" bg-white/10 rounded-3xl p-8 border border-[#00ff88e5] shadow-2xl shadow-[#00ff88] transition-all duration-500 group">
            <div className="relative h-81 w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border-2 border-dashed border-[#00ff88] flex items-center justify-center cursor-pointer overflow-hidden group-hover:border-purple-400/50 transition-all duration-300" onClick={() => document.getElementById('imageInput').click()}>
              {formData.image ? (
                <div className="relative w-full h-full">
                  <img src={formData.image} alt="Uploaded" className="object-cover w-full h-full rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Upload className="w-16 h-16 text-white/60 mx-auto animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">Drop your masterpiece</p>
                    <p className="text-white/70">Click or drag to upload an image</p>
                  </div>
                </div>
              )}
            </div>
            <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
          {/* Form Field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <label className="text-white font-medium">Project Title</label>
              </div>
              <input type="text" placeholder="Enter an epic title..." value={formData.title} onChange={(e) => handleChange("title", e.target.value)}
                className="w-full h-12 p-4 bg-black/30 rounded-xl text-white placeholder-white/50 border border-[#00ff88] focus:border-cyan-400 focus:outline-none transition-all duration-300" />
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-purple-400" />
                <label className="text-white font-medium">Author</label>
              </div>
              <input type="text" placeholder="Your Name..." value={formData.author} onChange={(e) => handleChange("author", e.target.value)}
                className="w-full h-12 p-4 bg-black/30 rounded-xl text-white placeholder-white/50 border border-[#00ff88] focus:border-purple-400 focus:outline-none transition-all duration-300" />
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className="w-5 h-5 text-green-400" />
                <label className="text-white font-medium">Total Fund You Need</label>
              </div>
              <input type="text" placeholder="Set your price..." value={formData.Fund} onChange={(e) => handleChange("Fund", e.target.value)}
                className="w-full h-12 p-4 bg-black/30 rounded-xl text-white placeholder-white/50 border border-[#00ff88] focus:border-green-400 focus:outline-none transition-all duration-300" />
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <label className="text-white font-medium">Carbon Credits</label>
              </div>
              <input type="text" placeholder="Number of credits..." value={formData.CarbonCredits} onChange={(e) => handleChange("CarbonCredits", e.target.value)}
                className="w-full h-12 p-4 bg-black/30 rounded-xl text-white placeholder-white/50 border border-[#00ff88] focus:border-yellow-400 focus:outline-none transition-all duration-300" />
            </div>
          </div>
          {/* Content Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-[#00ff88] shadow-[#00ff88] shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Project Description</h3>
              <button onClick={GenerateAI} disabled={isGenerating} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 active:scale-95">
                <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{isGenerating ? 'Generating...' : 'AI Enhance'}</span>
              </button>
            </div>
            <div className="relative">
              <textarea value={formData.content} onChange={(e) => handleChange("content", e.target.value)} placeholder="Describe your legendary project... What makes it special? What impact will it have?"
                className="w-full h-48 p-6 bg-black/30 rounded-2xl text-white placeholder-white/50 border border-[#00ff88] focus:border-cyan-400 focus:outline-none resize-none transition-all duration-300 text-lg leading-relaxed" />
              <div className="absolute bottom-4 right-4 text-white/40 text-sm">
                {formData.content.length} characters
              </div>
            </div>
          </div>
          {/* Publish Button */}
          <div className="text-center">
            <button onClick={handlePublishPost} className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Send className="w-6 h-6" />
                <span>Launch It</span>
              </div>
            </button>
            <p className="text-white/60 mt-4 text-sm">
              Your project will inspire the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
