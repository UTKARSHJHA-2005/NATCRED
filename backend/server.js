import express, { urlencoded } from "express";
import cors from "cors";  
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js";
import tempPostRoute from "./routes/tempPost.route.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Ensure the uploads directory exists (for local testing, not needed for Cloudinary)
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded images (Local storage, but Cloudinary is now used)
app.use("/uploads", express.static(uploadDir));

// API Routes
app.use("/api/v2/user", userRoute);
app.use("/api/posts", tempPostRoute);

// Start Server
app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server is running on port ${PORT}`);
});
