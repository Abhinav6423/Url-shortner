import mongoose from "mongoose";
import User from "../models/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Signup = async (req, res) => {
    const { name, email, password, profilePic } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePic
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'Lax',     // Or 'None' if cross-site cookies are used
            secure: false        // Set true only in production with HTTPS
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {

                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'Lax',     // Or 'None' if cross-site cookies are used
            secure: false        // Set true only in production with HTTPS
        })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const Logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: 'Lax',     // Or 'None' if cross-site cookies are used
        secure: false        // Set true only in production with HTTPS
    });
    res.status(200).json({ success: true, message: "Logout successful" });
}

const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user: {
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

export { Signup, Login, Logout, getUserDetails };