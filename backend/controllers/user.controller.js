import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import admin from "firebase-admin";
import User from "../model/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const COOKIE_NAME = "token";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax", // use "none" + secure:true if running HTTPS across domains
    secure: false, // set true on HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: "7d" });
    setAuthCookie(res, token);

    res
      .status(201)
      .json({ user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, bio, image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id, // `req.user` comes from authMiddleware after verifying JWT
      { name, email, phone, bio, image },
      { new: true, runValidators: true }, // return updated doc
    ).select("-password"); // don’t send password

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: err.message });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ message: "Logged out" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const google = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // decodedToken contains uid, email, name, picture, etc.
    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      // Create new user automatically
      user = await User.create({
        name: decodedToken.name,
        email: decodedToken.email,
        googleId: decodedToken.uid,
        photo: decodedToken.picture,
      });
    }

    // Generate your backend JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Google login failed" });
  }
};
