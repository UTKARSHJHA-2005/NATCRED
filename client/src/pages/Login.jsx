import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import google from '../assets/google.jpg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}>
      <div className="shadow-lg text-center w-[90%] md:w-[400px] bg-green-700 bg-opacity-80 rounded-xl p-6 border border-gray-500">
        <div className="text-[25px] text-white font-semibold">Login</div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email Address"
          className="w-full h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
          required
        /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="w-full h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
          required
        /><br />
        <button
          type="button"
          className="bg-blue-800 text-white hover:bg-blue-600 rounded-xl h-[50px] w-full mt-[20px]">
          Login
        </button>
        <div className="flex flex-col mt-[20px]">
          <button
            className="flex items-center justify-center bg-blue-500 rounded-xl h-[50px] text-white hover:bg-blue-700 w-full space-x-2">
            <img src={google} alt="google" className="w-9 h-9" />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="text-[18px] text-white mt-[20px]">
          New to the Platform? <br />
          <Link to="/signup">
            <button className="text-white font-semibold hover:font-bold hover:text-black">
              Click Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
