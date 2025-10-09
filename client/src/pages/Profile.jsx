import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../axios";
import "../components/Project.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Camera, User, Mail, Phone, FileText, Wallet, LogOut, Save, Settings, Grid, MessageSquare, ChevronRight, Edit3, Shield, Bell } from 'lucide-react';
import { MessageCircle, Share, ThumbsUp, ThumbsDown, Send, ArchiveX, Bookmark, ArrowRight, ArrowLeft } from "lucide-react"
import axios from "axios";
import profile from "../assets/profile.jpg";
import { useAuth } from "../AuthContext";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    image: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post("https://natcred-1.onrender.com/uploaduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;
      console.log(imageUrl)
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setProfileImage(URL.createObjectURL(file));
    } catch (err) {
      console.error("❌ Image upload failed:", err.response?.data || err.message);
    }
  };

  const handlelogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    if (user) {
      console.log("User from context:", user);
      console.log("Image from DB:", user.image);
      setFormData({
        image: user.image || profile,
        username: user.name || "",
        email: user.email,
        phone: user.phone,
        bio: user.bio,
      });
    }
  }, [user]);
  const [posts, setposts] = useState([])
  const [project, setproject] = useState([])
  useEffect(() => {
    getProject()
  }, []);

  const getProject = async () => {
    try {
      const res = await axios.get("https://natcred-1.onrender.com/api/project")
      const data = res.data;
      setproject(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % userPosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? userPosts.length - 1 : prev - 1
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWalletConnect = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log("Wallet Connected:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect your wallet.");
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get("https://natcred-1.onrender.com/api/posts")
      const data = res.data;
      setposts(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPosts()
  }, []);

  const ProjectCard = ({ project }) => {
    return (
      <>
        <div className="project-card" data-aos='flip-right'>
          <div className="card-glow"></div>
          <img src={project.image} alt={project.title} className="project-image" data-aos='fade-down' />
          <Link to={`/projects/${project._id}`} state={{ project }} className="card-content">
            <h3 className="project-title px-24" data-aos='fade-up'>{project.title}</h3>
            <p className="project-owner" data-aos='fade-up'>by {project.author}</p>
            <p className="project-description" data-aos='fade-up'>{project.content}</p>
            <div className="project-stats">
              <div className="stat-item">
                <span className="stat-value">{project.Fund}</span>
                <span className="stat-label">RAISED</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{project.CarbonCredits}</span>
                <span className="stat-label">CREDITS</span>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };
  const PostCard = ({ post }) => {
    console.log(post)
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const { user } = useAuth()
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    console.log(posts)
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

    const handledelete = async (id) => {
      try {
        await axios.delete(`https://natcred-1.onrender.com/api/posts/${id}`);
        setposts(posts.filter((p) => p._id !== id));
        alert("Deleted successfully");
      } catch (err) {
        console.error("Delete error:", err);
      }
    }

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        setComments([...comments, newComment]);
        setNewComment('');
      }
      console.log(comments)
    };

    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Post Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden border-2 border-green-500">
            {/* Post Header */}
            <div className="p-4 border-b border-slate-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-0.5">
                      <img
                        src={post.authorAvatar}
                        alt="Author"
                        className="w-full h-full rounded-full object-cover bg-slate-800"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white hover:text-purple-300 cursor-pointer transition-colors">
                      {post.author}
                    </h3>
                    <p className="text-slate-400 text-xs flex items-center space-x-2">
                      <span>Aug 16, 12:52 PM</span>
                      <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                      <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Follow</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-all duration-200">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button onClick={()=>handledelete(post._id)} className="p-2 rounded-lg bg-red-700 text-slate-300 hover:bg-red-600/50 hover:text-white transition-all duration-200">
                    <ArchiveX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-slate-100 text-sm mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Image - Full width, proper aspect ratio */}
              {post.image && (
                <div className="mb-4 relative group overflow-hidden rounded-xl">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Engagement Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/30 mb-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${hasLiked
                      ? 'bg-purple-500 text-white shadow-md shadow-purple-500/25'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-purple-500/20 hover:text-purple-300'
                      }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                    <span>{likes}</span>
                  </button>

                  <button
                    onClick={handleDislike}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${hasDisliked
                      ? 'bg-red-500 text-white shadow-md shadow-red-500/25'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-red-500/20 hover:text-red-300'
                      }`}
                  >
                    <ThumbsDown className={`w-3.5 h-3.5 ${hasDisliked ? 'fill-current' : ''}`} />
                    <span>{dislikes}</span>
                  </button>

                  <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 text-xs font-medium">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{comments.length}</span>
                  </button>
                </div>

                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-300 hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 text-xs font-medium">
                  <Share className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="border-t border-slate-700/30 pt-4">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                  <span>Comments ({comments.length})</span>
                </h4>

                {/* Comments List */}
                <div className="space-y-3 mb-4 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {comments.map((comment, index) => (
                    <div key={index} className="flex space-x-2">
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="w-7 h-7 rounded-full border border-slate-600 flex-shrink-0 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="bg-slate-700/30 rounded-lg p-2">
                          <span className="font-medium text-purple-300 text-xs">{comment.name}</span>
                          <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">{comment.text}</p>
                        </div>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-slate-400">
                          <button className="hover:text-purple-300 transition-colors">Like</button>
                          <button className="hover:text-purple-300 transition-colors">Reply</button>
                          <span>{comment.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="flex space-x-2">
                  <img
                    src={user.image}
                    alt="You"
                    className="w-7 h-7 rounded-full border border-slate-600 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-2 pr-8 bg-slate-700/50 rounded-lg text-white placeholder-slate-400 border border-slate-600/50 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-xs"
                      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(e)}
                    />
                    <button
                      onClick={handleCommentSubmit}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 rounded-md bg-purple-500 text-white hover:bg-purple-400 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
                      disabled={!newComment.trim()}
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/auth/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Updated User:", res.data.user);
      alert("Profile updated successfully!");
      navigate("/")
    } catch (err) {
      console.error("Profile update failed:", err);
      alert(err?.response?.data?.message || "Error updating profile");
    }
  };
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: Grid },
    { id: "posts", label: "Posts", icon: MessageSquare },
    // { id: "security", label: "Security", icon: Shield },
    // { id: "notifications", label: "Notifications", icon: Bell }
  ];

  const userProjects = project?.filter(
    (p) => p.author === user?.name
  );
  const userPosts = posts?.filter(
    (p) => p.author === user?.name,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-4">
            <Settings className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          </div>
        </div>
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}>
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full blur opacity-75"></div>
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white/20"
                  />
                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full p-3 cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
                  >
                    <Camera className="w-4 h-4" />
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{formData.username}</h2>
                <p className="text-slate-400">{formData.email}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-purple-400">{userProjects?.length || 0}</div>
                  <div className="text-xs text-slate-400">Projects</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">{userPosts?.length || 0}</div>
                  <div className="text-xs text-slate-400">Posts</div>
                </div>
              </div>

              {/* Wallet Status */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Wallet</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${walletAddress ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                    }`}>
                    {walletAddress ? 'Connected' : 'Not Connected'}
                  </div>
                </div>
                {walletAddress && (
                  <p className="text-slate-400 text-xs mt-2 truncate">{walletAddress}</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Profile Information</h3>
                  </div>

                  <div className="space-y-6">
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 text-slate-300 font-medium mb-2">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="flex items-center space-x-2 text-slate-300 font-medium mb-2">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-slate-300 font-medium mb-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-slate-300 font-medium mb-2">
                        <FileText className="w-4 h-4" />
                        <span>Bio</span>
                      </label>
                      <textarea
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
                      <button
                        onClick={handleWalletConnect}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${walletAddress
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        <Wallet className="w-4 h-4" />
                        <span>{walletAddress ? "Wallet Connected" : "Connect Wallet"}</span>
                      </button>

                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                      </button>

                      <button
                        onClick={handlelogout}
                        className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Grid className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-bold text-white">Your Projects</h3>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">
                        {userProjects?.length || 0}
                      </span>
                    </div>
                    <button onClick={() => navigate("/newproject")} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                      <span>New Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {userProjects?.length > 0 ? (
                    <div className="relative">
                      {/* Show only current project */}
                      <ProjectCard project={userProjects[currentIndex]} />

                      {/* Left Arrow */}
                      <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-purple-500/80 text-white rounded-full shadow-md hover:bg-purple-600 transition"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      {/* Right Arrow */}
                      <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-purple-500/80 text-white rounded-full shadow-md hover:bg-purple-600 transition"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Grid className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400">
                        No projects found. Create your first project!
                      </p>
                    </div>
                  )}
                </div>
              )}


              {activeTab === "posts" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                      <h3 className="text-xl font-bold text-white">Your Posts</h3>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">
                        {userPosts?.length || 0}
                      </span>
                    </div>
                    <button onClick={() => navigate("/newposts")} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                      <Edit3 className="w-4 h-4" />
                      <span>New Post</span>
                    </button>
                  </div>

                  {userPosts?.length > 0 ? (
                    <div className="relative">
                      {/* Post */}
                      <PostCard post={userPosts[currentIndex]} />

                      {/* Left Arrow */}
                      <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-purple-500/80 text-white rounded-full shadow-md hover:bg-purple-600 transition"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      {/* Right Arrow */}
                      <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-purple-500/80 text-white rounded-full shadow-md hover:bg-purple-600 transition"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400">No posts found. Share your first post!</p>
                    </div>
                  )}
                </div>
              )}
              {/* 
              {activeTab === "security" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Security Settings</h3>
                  </div>
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Security settings will be available soon.</p>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Bell className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
                  </div>
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">Notification settings will be available soon.</p>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
