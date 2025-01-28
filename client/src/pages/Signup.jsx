import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import google from '../assets/google.jpg'

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'radial-gradient(circle, #6EC207, beige)' }}>
      <div className="shadow-lg mt-[30px] text-center w-[90%] md:w-[500px] bg-green-700 bg-opacity-70 rounded-xl p-6 border border-green-500">
        <div className="text-[25px] font-semibold text-white mb-4">SignUp</div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the Name"
            className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
            required/><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
            required/><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
            required
          /><br />
        </div>
        <div className="flex flex-col items-center">
          <button
            className="flex items-center justify-center bg-blue-500 mt-[15px] rounded-xl h-[50px] text-white hover:bg-blue-700 w-full md:w-[400px] space-x-2">
            <img src={google} alt="google" className="w-9 h-9" />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="mt-[10px] flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <p className="text-[16px] font-semibold text-white">
            Agree to the terms and conditions
          </p>
        </div><br />
        <button
          type="button"
          className="bg-blue-800 text-white hover:bg-blue-600 rounded-xl h-[50px] w-full md:w-[400px] mt-[10px]"
        >
          SignUp
        </button>
        <div className="mt-[10px]">
          <div className="text-[16px] text-white">
            Already have an account?
            <br />
            <Link to='/login'>
              <button
                className="text-white font-semibold hover:font-bold hover:text-black">
                Click Here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
