import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/google.jpg';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../AuthContext';
import app from '../db'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export default function Login() {
  const { login } = useAuth()
  const { GoogleLogin } = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Send token to backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { idToken: token },
        { withCredentials: true }
      );

      console.log(res.data);
      GoogleLogin(res.data);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#233b5d]">
      {/* Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 shadow-green-600 rounded-3xl shadow-2xl border border-green-500 p-8 transform hover:scale-105 transition-all duration-300">
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70 text-sm">Sign in to continue your journey</p>
          </div>
          {/* Error Message */}
          {err && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-100 text-sm text-center animate-bounce">
              {err}
            </div>
          )}
          {/* Login Inputs */}
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={submit}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 text-white/70 rounded-full">or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleClick}
            className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-white/70 text-sm">
              New to the platform?{' '}
              <button
                onClick={() => navigate("/signup")}
                className="text-white font-semibold hover:text-emerald-300 transition-colors duration-300 underline decoration-2 underline-offset-2 hover:decoration-emerald-300"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
