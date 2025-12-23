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
        const finalImage = formData.imageUrl || "https://images.unsplash.com/photo-1511556820780-dba9ba36abe3?w=500&auto=format&fit=crop&q=60";

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
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex items-center justify-center py-12 px-4">

            <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Add New Product
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Fill in the details below.</p>
                    </div>
                    <Link
                        href="/product"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                placeholder="e.g. Wireless Coffee Maker"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className="block w-full pl-8 pr-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                            >
                                <option value="" className="text-gray-500">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Home & Living">Home & Living</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Toys">Toys</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {/* Image Input Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Image
                            </label>

                            <div className="space-y-4">
                                {/* File Upload */}
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400 mb-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600">Click to upload image</span>
                                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 500KB</span>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>

                                {imageError && (
                                    <p className="text-red-500 text-sm">{imageError}</p>
                                )}

                                {/* URL Fallback */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-50 text-gray-500">OR use URL</span>
                                    </div>
                                </div>

                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm"
                                    placeholder="https://example.com/image.jpg"
                                />

                                {formData.imageUrl && !imageError && (
                                    <div className="mt-2 w-full h-48 bg-gray-100 rounded border border-gray-200 overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                                placeholder="Detailed description of the product..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-100">
                        <Link
                            href="/product"
                            className="px-6 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-md shadow-md transform hover:-translate-y-0.5 transition-all"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
