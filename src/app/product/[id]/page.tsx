"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import api from "@/lib/axios";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        try {
            await api.delete(`/products/${id}`);
            router.push("/product");
        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete product. Please try again.");
            setIsDeleting(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                <Link href="/product" className="text-blue-600 hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-zinc-100 font-sans py-12 px-4 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href="/product"
                        className="text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to Products
                    </Link>

                    <div className="flex gap-3">
                        <Link
                            href={`/product/${id}/edit`}
                            className="px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
                    <div className="md:w-1/2 h-96 md:h-auto bg-gray-100 dark:bg-zinc-800 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full">
                                {product.category}
                            </span>
                            {product.stock > 0 ? (
                                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wider rounded-full">
                                    In Stock
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider rounded-full">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                            {product.name}
                        </h1>

                        <p className="text-3xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
                            ฿{product.price.toLocaleString()}
                        </p>

                        <div className="prose prose-sm text-gray-600 dark:text-zinc-400 mb-8 max-w-none">
                            <p>{product.description}</p>
                        </div>

                        <div className="mt-auto border-t border-gray-100 dark:border-zinc-800 pt-6">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-zinc-500">
                                <p>Stock available: <span className="font-medium text-gray-900 dark:text-zinc-300">{product.stock}</span></p>
                                <p>Product ID: <span className="font-mono">{product.id}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
