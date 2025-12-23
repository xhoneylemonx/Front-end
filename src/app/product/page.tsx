"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "@/utils/storage";

const getValidImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60"; // Default
    if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/")) return url;
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60"; // Fallback for invalid URLs (like file://)
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
        if (window.confirm("Are you sure you want to delete this gear? This action cannot be undone.")) {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            saveProducts(updatedProducts); // Save to local storage
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-purple-500 font-bold text-xl animate-pulse">Loading Gear...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">

            <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-neutral-800 pb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white uppercase italic">
                            Gaming Gear
                        </h1>
                        <p className="mt-2 text-neutral-400">
                            High-performance peripherals for the dedicated gamer.
                        </p>
                    </div>
                    <Link
                        href="/product/create"
                        className="mt-6 md:mt-0 inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all text-white uppercase"
                    >
                        + New Gear
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 text-neutral-500">
                        <p className="text-xl">Your inventory is empty.</p>
                        <Link href="/product/create" className="text-purple-400 hover:text-purple-300 underline mt-2 inline-block">Add your first item</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group block bg-[#111] border border-neutral-800 rounded-lg overflow-hidden hover:border-purple-500 transition-colors duration-200 relative">
                                {/* Clickable Image Area */}
                                <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] w-full bg-[#1a1a1a]">
                                    <Image
                                        src={getValidImageUrl(product.imageUrl)}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:opacity-90 transition-opacity"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 text-xs font-bold uppercase text-purple-400 border border-purple-500/30 rounded">
                                        {product.category}
                                    </div>
                                </Link>

                                <div className="p-4">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="text-lg font-bold text-white mb-1 truncate hover:text-purple-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-neutral-400 line-clamp-2 mb-4 h-10">
                                            {product.description}
                                        </p>
                                    </Link>

                                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                                        <span className="text-xl font-bold text-white">
                                            ฿{product.price.toLocaleString()}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-neutral-500 hover:text-red-500 transition-colors p-2 rounded hover:bg-neutral-800/50"
                                                title="Delete Item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                            <Link href={`/product/${product.id}`} className="text-sm font-semibold text-purple-400 hover:text-purple-300">
                                                View &rarr;
                                            </Link>
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
