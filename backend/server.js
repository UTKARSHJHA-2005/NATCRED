import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import tempPostRoute from "./routes/tempPost.route.js";
import products from "./routes/Product.routes.js"
import path from "path";
import fs from "fs";
import auth from "./routes/user.routes.js"
import multer from "multer";
import project from "./routes/Project.routes.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://natcred.vercel.app'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({});
const upload = multer({ storage });
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "projects",
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
})
app.post("/uploadprodimage", upload.single("productimage"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({ url: result.secure_url });
});

app.post("/uploadLogo", upload.single("logo"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({ url: result.secure_url });
});
const uploads = multer({ dest: "uploads/" });
app.post("/uploaduser", uploads.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles", // optional: organize in Cloudinary folder
    });

    // delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.json({ url: result.secure_url }); // return Cloudinary link
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});
app.use("/uploads", express.static(uploadDir));
app.use("/uploads", express.static("uploaduser"));
app.use("/api/auth", auth)
app.use("/api/posts", tempPostRoute);
app.use("/api/project", project);
app.use("/api/product", products);
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
});
