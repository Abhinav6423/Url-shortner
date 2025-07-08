import { Login, Signup, Logout , getUserDetails} from "../controllers/Auth.controller.js";
import verifyToken from "../middleware/Auth.middleware.js"

import express from "express";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/user", verifyToken, getUserDetails);

export default router;