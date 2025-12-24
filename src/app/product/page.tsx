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
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products</h1>
                        <p className="text-gray-500 mt-1">Manage your inventory</p>
                    </div>
                    <Link
                        href="/product/create"
                        className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">No products found. Start by adding one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full"
                            >
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-900 shadow-sm border border-gray-100">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <span className="text-lg font-bold text-gray-900 ml-3 shrink-0">
                                            ฿{product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                                        {product.description}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                                        <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-500'} font-medium flex items-center gap-1.5`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-600' : 'bg-red-500'}`}></span>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                        <span className="text-gray-400 text-xs">
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
