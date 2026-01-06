import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { connectDb } from "../config/db.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(async (req, res, next) => {
  await connectDb();   // 🔥 ENSURE DB FOR ALL USER ROUTES
  protectRoute(req, res, next);
});

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
