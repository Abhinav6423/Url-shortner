// components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Datacontext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { userInfo } = useContext(Datacontext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api/auth/logout", {
                withCredentials: true,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">

                {/* Logo */}
                <div className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Vertex
                    </span>
                    <span className="text-gray-900 ml-1">Guard</span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* User Info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <img
                            src={userInfo?.profilePic}
                            alt="avatar"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-gray-200 object-cover shadow-md transition duration-200"
                        />
                        <div className="leading-tight hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                                Welcome,{" "}
                                <span className="text-purple-600 hover:underline cursor-pointer transition-all duration-150">
                                    {userInfo?.name}
                                </span>
                            </p>
                            <p className="text-xs text-gray-400">
                                Security is a process, not a product.
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[0.97] transition duration-200"
                    >
                        <FaSignOutAlt className="text-sm sm:text-base" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
