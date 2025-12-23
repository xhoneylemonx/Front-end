"use client";

import Link from "next/link";
import { useState } from "react";

export default function CreateProductPage() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
        stock: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., API call)
        console.log("Form submitted:", formData);
        alert("Gaming Gear created successfully! (Mock)");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center py-12 px-4 selection:bg-purple-500 selection:text-white">
            {/* Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-900/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                    <div>
                        <h2 className="text-2xl font-black uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            New Inventory
                        </h2>
                        <p className="text-xs text-gray-500 font-mono mt-1">ADD_ITEM_TO_DATABASE</p>
                    </div>
                    <Link
                        href="/product"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> CANCEL
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Razer Huntsman V3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                    Price (THB)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">฿</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        required
                                        min="0"
                                        step="1"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="block w-full pl-8 pr-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                        placeholder="2500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    required
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                            >
                                <option value="" className="bg-neutral-900">Select Gear Type</option>
                                <option value="Keyboard" className="bg-neutral-900">Keyboard</option>
                                <option value="Mouse" className="bg-neutral-900">Mouse</option>
                                <option value="Headset" className="bg-neutral-900">Headset</option>
                                <option value="Monitor" className="bg-neutral-900">Monitor</option>
                                <option value="Gaming Chair" className="bg-neutral-900">Gaming Chair</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-lg border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                placeholder="Detailed specs of the gear..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-end space-x-4 border-t border-white/10">
                        <Link
                            href="/product"
                            className="px-6 py-3 border border-white/10 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/5 transition-all uppercase tracking-wide"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-900/30 transform hover:-translate-y-0.5 transition-all uppercase tracking-wide"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
