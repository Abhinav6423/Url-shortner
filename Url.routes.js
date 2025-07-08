import { createUrl, getUrls, deleteUrl } from "../controllers/Url.controller.js";
import verifyToken from "../middleware/Auth.middleware.js";

import express from "express";
const router = express.Router();

router.post("/create", verifyToken, createUrl);
router.get("/urls", verifyToken, getUrls);
router.delete("/delete/:id", verifyToken, deleteUrl);


export default router;