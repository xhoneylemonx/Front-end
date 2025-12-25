"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import api from "@/lib/axios";

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 font-sans p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Products</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your inventory</p>
                    </div>
                    <Link
                        href="/product/create"
                        className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-24 bg-white dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
                        <p className="text-gray-500 dark:text-gray-400">No products found. Start by adding one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                                className="group bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-zinc-900/50 hover:border-gray-300 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="aspect-[16/10] bg-gray-100 dark:bg-zinc-900 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white shadow-sm border border-gray-100 dark:border-zinc-700">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {product.name}
                                        </h3>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white shrink-0">
                                            ฿{product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                                        {product.description}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-700 flex justify-between items-center text-sm">
                                        <span className={`${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'} font-medium flex items-center gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-600 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`}></span>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                        <span className="text-gray-400 dark:text-zinc-500 text-xs">
                                            Added {new Date(product.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
