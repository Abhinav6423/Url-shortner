import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Datacontext } from '../context/Usercontext';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { fetchUserInfo } = useContext(Datacontext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true })

            if (res.status) {
                fetchUserInfo();
                navigate("/profile")
            }


        } catch (error) {
            console.log("Failed to sign up user", error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-sans px-4">
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-3xl overflow-hidden">

                {/* Left Panel */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex-col items-center justify-center p-10">
                    <h1 className="text-4xl font-bold text-gray-700 mb-4">Welcome!</h1>
                    <p className="text-gray-600 text-center max-w-sm">
                        Enter your credentials and discover the smooth experience.
                    </p>
                    <img
                        src="https://illustrations.popsy.co/gray/remote-work.svg"
                        alt="illustration"
                        className="w-64 mt-6"
                    />
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Login to your account</h2>
                    <form className="space-y-5" onSubmit={handleLogin} method='post'>
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm">Email</label>
                            <input
                                type="text"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-gray-700 text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                        </div>
                        <button
                            type="Submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Login Now
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
                        Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </div>


                </div>
            </div>
        </div>
    );



};

export default Login;
