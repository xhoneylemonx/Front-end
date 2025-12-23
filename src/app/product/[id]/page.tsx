"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts } from "@/utils/storage";

const getValidImageUrl = (url: string) => {
    if (!url) return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60";
    if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("/")) return url;
    return "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60";
};

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const products = getProducts();
            const foundProduct = products.find((p) => p.id === id);
            setProduct(foundProduct || null);
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-purple-500 font-bold text-xl animate-pulse">Loading Details...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-neutral-400 mb-6">The gear you are looking for does not exist or has been removed.</p>
                <Link href="/product" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-bold uppercase transition-colors">
                    Back to Inventory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link href="/product" className="text-neutral-400 hover:text-white transition-colors">
                                    <span className="sr-only">Home</span>
                                    GAMING GEAR
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-neutral-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <a href="#" className="ml-4 text-sm font-medium text-purple-500 pointer-events-none" aria-current="page">
                                    {product.name}
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="relative w-full aspect-[4/3] bg-[#111] rounded-lg overflow-hidden border border-neutral-800 shadow-[0_0_50px_-12px_rgba(168,85,247,0.2)]">
                            <Image
                                src={getValidImageUrl(product.imageUrl)}
                                alt={product.name}
                                fill
                                className="object-cover object-center"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded text-xs font-bold text-purple-400 uppercase tracking-widest mb-3">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase italic sm:text-5xl">
                                {product.name}
                            </h1>
                        </div>

                        <div className="mt-3">
                            <p className="text-3xl text-white font-bold">
                                ฿{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-neutral-800" />
                            </div>
                            <div className="relative flex justify-start">
                                <span className="pr-3 bg-[#0a0a0a] text-sm font-bold text-neutral-500 uppercase tracking-wide">
                                    Specifications
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-base text-neutral-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-8 border-t border-neutral-800 pt-8">
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center space-x-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    <span className="relative flex h-3 w-3">
                                        {product.stock > 0 && (
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        )}
                                        <span className={`relative inline-flex rounded-full h-3 w-3 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </span>
                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                <span className="text-neutral-600">|</span>
                                <span className="text-sm text-neutral-400 font-mono">
                                    ID: {product.id}
                                </span>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button
                                    type="button"
                                    disabled={product.stock === 0}
                                    className={`flex-1 flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded uppercase tracking-widest transition-all ${product.stock > 0
                                            ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transform hover:-translate-y-1'
                                            : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                        }`}
                                >
                                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                                </button>
                                {/* Like Button */}
                                <button className="flex items-center justify-center px-4 py-4 border border-neutral-800 rounded hover:border-purple-500 hover:text-purple-500 transition-colors text-neutral-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
