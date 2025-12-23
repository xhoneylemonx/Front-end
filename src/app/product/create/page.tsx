"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/utils/storage";
import { Product } from "@/types/product";

export default function CreateProductPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        imageUrl: "",
        stock: "",
    });
    const [imageError, setImageError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageError("");

        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                setImageError("File size too large. Please upload an image under 500KB.");
                setFormData((prev) => ({ ...prev, imageUrl: "" }));
                if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Use uploaded image OR internet URL OR placeholder
        const finalImage = formData.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60";

        const newProduct: Product = {
            id: Date.now().toString(),
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            description: formData.description,
            imageUrl: finalImage,
            stock: Number(formData.stock),
            createdAt: new Date().toISOString(),
        };

        try {
            addProduct(newProduct);
            router.push("/product");
        } catch (error) {
            console.error("Storage failed", error);
            alert("Failed to save product. Storage might be full.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center py-12 px-4 selection:bg-purple-500 selection:text-white">

            <div className="max-w-2xl w-full bg-[#111] border border-neutral-800 rounded-lg shadow-xl overflow-hidden">
                <div className="px-8 py-6 border-b border-neutral-800 flex justify-between items-center bg-[#151515]">
                    <div>
                        <h2 className="text-xl font-bold uppercase italic tracking-wider text-white">
                            Add New Gear
                        </h2>
                        <p className="text-xs text-neutral-500 font-mono mt-1">INVENTORY_MANAGEMENT</p>
                    </div>
                    <Link
                        href="/product"
                        className="text-sm font-bold text-neutral-400 hover:text-white transition-colors"
                    >
                        CANCEL
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none"
                                placeholder="e.g. Razer Huntsman V3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                                    Price (THB)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-neutral-500">฿</span>
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
                                        className="block w-full pl-8 pr-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none"
                                        placeholder="2500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
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
                                    className="block w-full px-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none"
                            >
                                <option value="" className="bg-[#111]">Select Gear Type</option>
                                <option value="Keyboard" className="bg-[#111]">Keyboard</option>
                                <option value="Mouse" className="bg-[#111]">Mouse</option>
                                <option value="Headset" className="bg-[#111]">Headset</option>
                                <option value="Monitor" className="bg-[#111]">Monitor</option>
                                <option value="Gaming Chair" className="bg-[#111]">Gaming Chair</option>
                            </select>
                        </div>

                        {/* Image Input Section */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                                Product Image
                            </label>

                            <div className="space-y-4">
                                {/* File Upload */}
                                <div className="relative border-2 border-dashed border-neutral-700 rounded-lg p-6 flex flex-col items-center justify-center hover:border-purple-500 transition-colors cursor-pointer bg-[#0f0f0f]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-neutral-400 mb-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm text-neutral-400">Click to upload image</span>
                                    <span className="text-xs text-neutral-600 mt-1">Max size: 500KB</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>

                                {imageError && (
                                    <p className="text-red-500 text-sm font-bold">{imageError}</p>
                                )}

                                {/* URL Fallback */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-neutral-800"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-[#111] text-neutral-500">OR use URL</span>
                                    </div>
                                </div>

                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none text-sm"
                                    placeholder="https://example.com/image.jpg"
                                />

                                {formData.imageUrl && !imageError && (
                                    <div className="mt-2 w-full h-48 bg-[#0a0a0a] rounded border border-neutral-800 overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-bold text-neutral-300 mb-2 uppercase tracking-wide">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded border border-neutral-800 bg-[#0a0a0a] text-white placeholder-neutral-600 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors outline-none"
                                placeholder="Detailed specs of the gear..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-end space-x-4 border-t border-neutral-800">
                        <Link
                            href="/product"
                            className="px-6 py-3 border border-neutral-700 rounded text-sm font-bold text-neutral-300 hover:bg-neutral-800 transition-all uppercase tracking-wide"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
