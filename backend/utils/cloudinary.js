import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();
console.log("Hello from cloudinary")
// Configure Cloudinary with your Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  // Your Cloudinary cloud name
  api_key: process.env.API_KEY,        // Your Cloudinary API key
  api_secret: process.env.API_SECRET,  // Your Cloudinary API secret
});

export default cloudinary;
