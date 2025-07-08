// pages/Profile.jsx

import React from 'react';
import { FaCopy, FaExternalLinkAlt, FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Createlink from '../components/Createlink';








const Profile = () => {
    const [links, setLinks] = useState([])


    useEffect(() => {
        const allurl = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/url/urls", {
                    withCredentials: true
                })

                if (res.data && res.data.data) {
                    setLinks(res.data.data); // ✅ safer, based on your backend response
                }



            } catch (error) {
                console.log("Error fetching all urls", error)

            }
        }

        allurl()
    }, [links.length])

    const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

    const topLink = links.reduce((max, link) => {
        return (link.clicks || 0) > (max.clicks || 0) ? link : max;
    }, {});

    const handleDelete = async (id) => {
        console.log(id)
        const confirmDelete = window.confirm("Are you sure you want to delete this link?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`http://localhost:5000/api/url/delete/${id}`, {
                withCredentials: true
            })

            if (res.data.status) {
                setLinks(prevLinks => prevLinks.filter(link => link._id !== id));
            }
            else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log("Error deleting link", error)

        }
    }




    return (
        <>
            <Navbar />

            <div className="px-4 md:px-10 py-8 bg-gray-50 min-h-screen text-gray-800 font-['Inter']">
                {/* Page Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">My Dashboard</h2>
                    <p className="text-gray-500 text-sm">Your shortened URLs and performance analytics.</p>
                </div>



                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                        <h4 className="text-sm text-gray-500">Total Links</h4>
                        <p className="text-2xl font-semibold mt-2">{links.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                        <h4 className="text-sm text-gray-500">Total Clicks</h4>
                        <p className="text-2xl font-semibold mt-2">{totalClicks}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                        <h4 className="text-sm text-gray-500">Top Link</h4>
                        <a
                            href={`http://localhost:5000/${topLink.shortUrl}`}
                            target="_blank" rel="noreferrer"

                            className="text-blue-600 mt-2 block font-medium truncate hover:underline"
                        >
                            {`http://localhost:5000/${topLink.shortUrl}`}
                        </a>
                        {/* <p className="text-xs text-gray-400 mt-1">{mostClicked.clicks} clicks</p> */}
                    </div>
                </div>

                {/* Links Table */}
                <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-500 font-medium">
                            <tr>
                                <th className="py-3 px-6">Short URL</th>
                                <th className="py-3 px-6">Original URL</th>
                                <th className="py-3 px-6 text-center">Clicks</th>
                                <th className="py-3 px-6 text-center">Created</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link) => (
                                <tr key={link._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-6 text-blue-600 flex items-center gap-2">
                                        <a href={`http://localhost:5000/${link.shortUrl}`} target="_blank" rel="noreferrer" className="hover:underline">
                                            {`http://localhost:5000/${link.shortUrl}`}
                                        </a>
                                        <FaExternalLinkAlt className="text-xs text-gray-400" />
                                    </td>
                                    <td className="py-3 px-6 truncate max-w-sm">{link.longUrl}</td>
                                    <td className="py-3 px-6 text-center">{link.clicks}</td>
                                    <td className="py-3 px-6 text-center">{link.createdAt}</td>
                                    <td className="py-3 px-6 text-center space-x-3 text-gray-600">
                                        <button title="Copy">
                                            <FaCopy className="hover:text-blue-500" />
                                        </button>
                                        <button title="Edit">
                                            <FaEdit className="hover:text-yellow-500" />
                                        </button>
                                        <button title="Delete" onClick={() => handleDelete(link._id)}>
                                            <FaTrash className="hover:text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* create form */}
                <div className="mt-10">
                    <Createlink />
                </div>
            </div >
        </>
    );
};

export default Profile;
