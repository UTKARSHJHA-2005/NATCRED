import express from "express";
import { login, register, logout, me,updateProfile, google } from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", requireAuth, updateProfile);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, me);
router.post("/google",google)

export default router;
