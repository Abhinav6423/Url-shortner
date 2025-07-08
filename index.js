// server/index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.config.js";
import Authroutes from "./routes/Auth.routes.js";
import Urlroutes from "./routes/Url.routes.js";
import { redirection } from "./controllers/Url.controller.js";
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies from requests

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true                // allow cookies to be sent
}));

// Routes
app.get("/", (req, res) => {
    res.send("✅ Server is running");
});

//auth routes 
app.use("/api/auth", Authroutes);

//url routes
app.use("/api/url", Urlroutes);
app.get("/:shortUrl", redirection);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
});
