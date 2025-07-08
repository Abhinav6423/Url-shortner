
import User from "../models/Usermodel.js";
import jwt from "jsonwebtoken";


const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);

        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;