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
import OpenAI from "openai";
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
const client = new OpenAI({
  apiKey: process.env.VITE_OPENROUTER,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://natcred.vercel.app",
    "X-Title": "NatCred AI",
    "User-Agent": "NatCred-Backend/1.0"
  }
});
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
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required"
      });
    }

    const response = await client.chat.completions.create({
      model: "tngtech/tng-r1t-chimera:free",
      messages: [
        {
          role: "system",
          content:
            "You are a professional content writer. Expand clearly. Do not use markdown symbols like *, ###, or -."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    res.json({
      success: true,
      content: response.choices[0].message.content
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});