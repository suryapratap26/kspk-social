import express from "express"
import { logout,logIn, signUp ,onboard} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/logout',logout);
router.post('/login',logIn);
router.post('/signup',signUp);
router.post('/onboarding',protectRoute,onboard)

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;