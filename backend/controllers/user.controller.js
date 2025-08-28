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
    projectId: "natcred-e208f",
    clientEmail: "jha.utkarsh2005@gmail.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfa+1LCRRl82p4\n/84bLWk8eFHKftHwOxMVyzEj9A7zzjTxlSZ3Pbp56dndYTxAbxtB82fXHCdpE8b1\nZFtvLRAkjxYcXpHhm1HScpyAfZc/b4UO3P9vdZ4w4ynWJn/9xk9Kd4PuWkSO7xR3\nP2RN8tWREti5svsRaQdHkPfPG4q9VFD2FyNkdz/dWJA6yU5kvY4+bjTENf5ZBfzM\n+Du4TL9hP1VUaCmdX1RmMehtcrtIRQgDEYZ99xfj71oTQk0AQSgLdtDbXAFn0V05\n2sw132hLn6m0KNSgPJMQ4cwQhRaxg9Me6YZji9QszpmDWWQNxRNpNxDsAfeoKQsi\njAa9iQHrAgMBAAECggEAGYQjP1rNLoI23PYIjZYHnXuej7wbqwkxhU/35grGp+Qt\n2irmtLgnFCNHUSUiiSefY79rM+VYM3vMYPN2pQU/67IRNmo2jDcZcgcRIIm5fxhA\n4j+iDLt1HdsGE7Ymzz4B6+fUMH63MW93xZxaWBWRdD5hfNt2TvOSDDTaTQZZ/vJy\nn5ZsjPiHeX8L+t5kYhSgXkJNBY8QhZ2JfMm0qByPN7MjR1Swri7q2UDOUf/46DDJ\n4WfDB/HbAzgU+at7+LfPsfREMQB+6iesWnHWzCHSlnfje7e+2d8+jRXoHU3xDeEs\nKl1I3UH8Xu7INf/t7eDqC/uAG7Gks8C8BxrKrHvQTQKBgQDUswbPJTxwj8M2uxXf\nmftv7RCV9u+ZozUtT8KdeafqjaSNu25oHE+FpOP7L84FjlblqHkVaPqjhnjb9HO8\noE4zp2ryxpxkol06m+hsVO8ceNj9dImTQLixj/Y0nahzwSwsqCTy6n8U4f803d3M\nSlsGaCnrDfG1s4BjWkm2lSrSjQKBgQC/4EtNH4mUU68oqnAUfiyNK3XGV4qauiJM\nJ+uS2hOJyTYh7CyaqoYpH7y2inn9lXndhqsHKF3k3BmWw3unz6t8VZltXtzs3bK/\nOSkAAL+ERy2RJ+5dGD/Ks3C+CmSzJfrV6DSHsjw2Z5Fvx9R0V/k25f8ysy1Z8t3X\nDBLf38ZEVwKBgEJrOTgcR5havDnuB/GQEv0riR9bQgy281cX7gzgvXe4DWeY3Owz\n0v1HtU1t6ya/ARGsH0t5QbMovbrpxe5kHKdyoyn2rUWbkgNIRjb1+sjoT9Itvvw1\nnLcN3nMlvEGRU+sKAqe8ZDywKdJnaehuW6hPhK965jy4NeJQgm46fGnNAoGADPhO\nXsI4/IvDlU4gEWKOBGThqyyTs+3ND7TLGbwgAfpV7GkYgsPwGauJiBVINbn66NyH\nhw5VenjeSfCg1TEWeGsY2enFqUU7Je3pNZTXXUuqatt2I1jWRw9mGZJ+SBXTJM5z\nbpC/vTW3AQVS+SJROELHw1eVQzVFhZnNVNC9iDUCgYBDYbsBDuQG9EwUqVVRF2Wr\n9E8muhABw2T4H/rCxi+nsPQmnwJt97u9nfRSWT9K/ljO6JNKJdSX+I/BBMPrw7Pa\nwTdFZM/O1RLe/0/Vb0uLJtn29VoDYGhLQ3O5fUjQiogUCACMKvTwBT5mBlQ8PrBx\nNijHhoQ7+sQTETK8FFhm3g==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, "\n"),
  }),
});

const setAuthCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",       // use "none" + secure:true if running HTTPS across domains
    secure: false,         // set true on HTTPS
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
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: "7d" });
    setAuthCookie(res, token);

    res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Register failed", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, bio, image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,  // `req.user` comes from authMiddleware after verifying JWT
      { name, email, phone, bio, image },
      { new: true, runValidators: true } // return updated doc
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
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: err.message });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: "lax", secure: false });
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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Google login failed" });
  }
}