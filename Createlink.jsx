import React, { useState } from "react";
import axios from "axios";

export default function Createlink({ onLinkCreated }) {
    const [longUrl, setLongUrl] = useState("");
    const [customUrl, setCustomUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/url/create",
                { longUrl, customUrl },
                { withCredentials: true }
            );

            if (res.data.status) {
                setMessage(`✅ ${res.data.message}`);
                onLinkCreated(res.data.data); // Pass new link to parent
                setLongUrl("");
                setCustomUrl("");
            } else {
                setMessage(res.data.message || "❌ Failed to create link");
            }
        } catch (err) {
            setMessage(` ${res.data.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6 w-full max-w-xl mx-auto mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Generate Short Link</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Long URL</label>
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="https://example.com/page"
                        required
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Custom Short URL <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="my-link-name"
                        className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg shadow hover:scale-[1.02] transition disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Generate"}
                </button>

                {message && <p className="text-sm mt-2 text-blue-600">{message}</p>}
            </form>
        </div>
    );
}
