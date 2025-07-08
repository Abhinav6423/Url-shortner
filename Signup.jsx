import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Datacontext } from '../context/Usercontext';
const Signup = () => {

    const navigate = useNavigate();
    const { fetchUserInfo } = useContext(Datacontext);

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [profilePic, setProfilePic] = useState()

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all required fields");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password, profilePic }, { withCredentials: true })

            if (res.status) {
                fetchUserInfo();
                navigate("/profile")
            }


            setName()
            setEmail()
            setPassword()
            setProfilePic()
        } catch (error) {
            console.log("Failed to sign up user", error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f4ff] to-[#fef4fc] px-4">
            <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Left Panel - Welcome Visual */}
                <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#f7f0ff] to-[#fef6ff] p-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h2>
                    <p className="text-gray-600 text-center max-w-sm mb-8">
                        Create an account and join the journey to something amazing!
                    </p>
                    <img
                        src="https://illustrations.popsy.co/gray/remote-work.svg"
                        alt="Signup Illustration"
                        className="w-72 object-contain"
                    />
                </div>

                {/* Right Panel - Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Join Us Today </h2>
                    <p className="text-gray-500 mb-6 text-center">Create your account below</p>

                    <form className="space-y-5" onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="text"
                            placeholder="Profile Pic URL"
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#6a5acd] to-[#ba68c8] text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Already have an account?
                        <Link to="/" className="text-purple-600 ml-1 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );






};

export default Signup;
