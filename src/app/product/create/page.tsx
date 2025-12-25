"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { productSchema, ProductFormData } from "@/lib/schema";
import { useState } from "react";
import { AxiosError } from "axios";

export default function CreateProductPage() {
    const router = useRouter();
    const [imageError, setImageError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema as any),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            description: "",
            imageUrl: "",
            stock: 0,
        },
    });

    const imageUrl = watch("imageUrl");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageError("");

        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                setImageError("File size too large. Please upload an image under 500KB.");
                setValue("imageUrl", "");
                e.target.value = ""; // Reset input
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("imageUrl", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        setIsSubmitting(true);
        try {
            await api.post('/products', data);
            router.push("/product");
        } catch (error) {
            console.error("Failed to create product", error);
            if (error instanceof AxiosError) {
                alert(`Failed to save product: ${error.message}`);
            } else {
                alert("Failed to save product. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-zinc-100 font-sans flex items-center justify-center py-12 px-4 transition-colors duration-300">

            <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-300">
                <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 transition-colors duration-300">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Add New Product
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">Fill in the details below.</p>
                    </div>
                    <Link
                        href="/product"
                        className="text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name")}
                                className={`block w-full px-4 py-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none`}
                                placeholder="e.g. Wireless Coffee Maker"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                    Price (THB)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 dark:text-zinc-400">฿</span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        step="1"
                                        {...register("price", { valueAsNumber: true })}
                                        className={`block w-full pl-8 pr-4 py-3 rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    {...register("stock", { valueAsNumber: true })}
                                    className={`block w-full px-4 py-3 rounded-md border ${errors.stock ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none`}
                                    placeholder="0"
                                />
                                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                {...register("category")}
                                className={`block w-full px-4 py-3 rounded-md border ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none`}
                            >
                                <option value="" className="text-gray-500">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Home & Living">Home & Living</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Toys">Toys</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Image Input Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                Product Image
                            </label>

                            <div className="space-y-4">
                                {/* File Upload */}
                                <div className="relative border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-8 flex flex-col items-center justify-center hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer bg-white dark:bg-zinc-800/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400 dark:text-zinc-500 mb-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-zinc-400">Click to upload image</span>
                                    <span className="text-xs text-gray-400 dark:text-zinc-500 mt-1">PNG, JPG up to 500KB</span>
                                    <input
                                        type="file"
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
                                        <div className="w-full border-t border-gray-200 dark:border-zinc-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-50 dark:bg-zinc-900 text-gray-500 dark:text-zinc-500">OR use URL</span>
                                    </div>
                                </div>

                                <input
                                    type="url"
                                    id="imageUrl"
                                    {...register("imageUrl")}
                                    className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm"
                                    placeholder="https://example.com/image.jpg"
                                />

                                {imageUrl && !imageError && (
                                    <div className="mt-2 w-full h-48 bg-gray-100 dark:bg-zinc-800 rounded border border-gray-200 dark:border-zinc-700 overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imageUrl || ""} alt="Preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                {...register("description")}
                                className={`block w-full px-4 py-3 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'} bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none`}
                                placeholder="Detailed description of the product..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className="pt-6 flex items-center justify-end space-x-4 border-t border-gray-100 dark:border-zinc-800">
                        <Link
                            href="/product"
                            className="px-6 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-black dark:bg-zinc-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-black text-sm font-medium rounded-md shadow-md transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
