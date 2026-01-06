import express from "express";
import { logout, logIn, signUp, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { connectDb } from "../config/db.js"; // ✅ IMPORT

const router = express.Router();

// LOGIN
router.post("/login", async (req, res, next) => {
  await connectDb();        // ✅ ENSURE DB
  return logIn(req, res, next); // ✅ CORRECT NAME
});

// SIGNUP
router.post("/signup", async (req, res, next) => {
  await connectDb();
  return signUp(req, res, next);
});

// LOGOUT (no DB needed, but safe)
router.post("/logout", logout);

// ONBOARDING
router.post("/onboarding", async (req, res, next) => {
  await connectDb();
  return protectRoute(req, res, () => onboard(req, res, next));
});

// GET AUTH USER
router.get("/me", async (req, res, next) => {
  await connectDb();
  return protectRoute(req, res, () => {
    res.status(200).json({ success: true, user: req.user });
  });
});

export default router;
