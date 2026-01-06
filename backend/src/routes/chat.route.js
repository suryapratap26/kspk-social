import express from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { connectDb } from "../config/db.js";

const router = express.Router();

router.get("/token", async (req, res, next) => {
  await connectDb();
  return protectRoute(req, res, () => getStreamToken(req, res, next));
});

export default router;
