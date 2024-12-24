import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.jpg';

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "Utkarsh Jha",
    email: "utkarshjha@gmail.com",
    phone: "+91 9876543210",
    bio: "Software Engineer | Web Developer",
  });
  
  const navigate = useNavigate(); 
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form Data Submitted:", formData); 
    navigate('/'); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Settings</h1>
        <p className="text-gray-500">
          Manage your personal information and account settings.
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <div className="relative w-32 h-32">
          <img
            src={profileImage || profile}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-gray-300"/>
          <label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 bg-darkred text-white rounded-full p-2 cursor-pointer hover:bg-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 7.5l-9 9m0-9l9 9"/>
            </svg>
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}/>
        </div>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-darkred focus:border-darkred"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-darkred focus:border-darkred"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-darkred focus:border-darkred"/>
        </div>
        <div>
          <label htmlFor="bio" className="block text-gray-700 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-darkred focus:border-darkred"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
