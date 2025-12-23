"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500 font-medium text-lg">Loading Details...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-900">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-gray-500 mb-6">The item you are looking for does not exist or has been removed.</p>
                <Link href="/product" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <div>
                                <Link href="/product" className="text-gray-400 hover:text-gray-700 transition-colors">
                                    <span className="sr-only">Home</span>
                                    Shop
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">
                                    {product.name}
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
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
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                                {product.category}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h1>
                        </div>

                        <div className="mt-3">
                            <p className="text-3xl text-gray-900 font-bold">
                                ฿{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`flex items-center space-x-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm font-medium">
                                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-400">
                                    SKU: {product.id}
                                </span>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    disabled={product.stock === 0}
                                    className={`flex-1 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition-all shadow-sm ${product.stock > 0
                                            ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                                </button>
                                {/* Like Button */}
                                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
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
