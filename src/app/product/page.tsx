"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "@/utils/storage";

const getValidImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60"; // Default
    if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/")) return url;
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60"; // Fallback for invalid URLs
};

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load products from local storage on mount
        const loadedProducts = getProducts();
        setProducts(loadedProducts);
        setIsLoading(false);
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            saveProducts(updatedProducts); // Save to local storage
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500 font-medium text-lg">Loading Products...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Discover Products
                        </h1>
                        <p className="mt-2 text-gray-500 text-sm">
                            Explore our curated collection of high-quality items.
                        </p>
                    </div>
                    <Link
                        href="/product/create"
                        className="mt-6 md:mt-0 inline-flex items-center justify-center px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-md shadow-sm transition-all"
                    >
                        + New Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">No products found.</p>
                        <Link href="/product/create" className="text-blue-600 hover:text-blue-500 hover:underline mt-2 inline-block text-sm">Add your first product</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
                                {/* Clickable Image Area */}
                                <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-100 overflow-hidden">
                                    <Image
                                        src={getValidImageUrl(product.imageUrl)}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-gray-700 rounded shadow-sm">
                                        {product.category}
                                    </div>
                                </Link>

                                <div className="p-4 flex-1 flex flex-col">
                                    <Link href={`/product/${product.id}`} className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 line-clamp-2 h-8 mb-3 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </Link>

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                        <span className="text-lg font-bold text-gray-900">
                                            ฿{product.price.toLocaleString()}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <Link href={`/product/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                <span className="sr-only">View</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                                                title="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
