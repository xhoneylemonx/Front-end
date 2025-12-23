import Link from "next/link";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

// Mock Data - Synced with Listing Page
const products: Product[] = [
    {
        id: "1",
        name: "Razer BlackWidow V4 Pro",
        description: "Mechanical gaming keyboard with Razer Chroma RGB, dedicated macro keys, and command dial. Experience immersive underglow and per-key lighting tailored for ultimate battle stations.",
        price: 8990,
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60",
        category: "Keyboard",
        stock: 5,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Logitech G Pro X Superlight 2",
        description: "Ultra-lightweight wireless gaming mouse designed for esports professionals. Featuring 2K polling, Hybrid Optical-Mechanical Switches, and Hero 2 sensor.",
        price: 5690,
        imageUrl: "https://images.unsplash.com/photo-1615663245857-acda5b2a643e?w=500&auto=format&fit=crop&q=60",
        category: "Mouse",
        stock: 15,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "HyperX Cloud Alpha Wireless",
        description: "DTS Headphone:X Spatial Audio and up to 300 hours of battery life. Dual Chamber Drivers for incredible audio distinction and reduced distortion.",
        price: 6990,
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60",
        category: "Headset",
        stock: 10,
        createdAt: new Date().toISOString(),
    },
    {
        id: "4",
        name: "Secretlab TITAN Evo",
        description: "The gold standard of gaming chairs. Integrated lumbar support and magnetic memory foam head pillow.",
        price: 18900,
        imageUrl: "https://images.unsplash.com/photo-1616628188550-808882bab58c?w=500&auto=format&fit=crop&q=60",
        category: "Gaming Chair",
        stock: 3,
        createdAt: new Date().toISOString(),
    },
    {
        id: "5",
        name: "ASUS ROG Swift OLED PG27AQDM",
        description: "27-inch 1440p OLED gaming monitor with 240Hz refresh rate and 0.03ms response time.",
        price: 34900,
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
        category: "Monitor",
        stock: 2,
        createdAt: new Date().toISOString(),
    },
    {
        id: "6",
        name: "SteelSeries Apex Pro TKL",
        description: "World's fastest keyboard with adjustable OmniPoint 2.0 switches.",
        price: 7990,
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60",
        category: "Keyboard",
        stock: 8,
        createdAt: new Date().toISOString(),
    }
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = products.find((p) => p.id === resolvedParams.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
            {/* Background Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-purple-900/10 blur-[150px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Link
                    href="/product"
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white transition-colors mb-12 uppercase tracking-wide group"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Gear
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="relative w-full aspect-[4/3] bg-gray-900/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 flex flex-col h-full justify-center">
                        <div className="mb-6">
                            <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs px-3 py-1 rounded full uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 italic uppercase">
                            {product.name}
                        </h1>

                        <div className="mt-2 mb-8">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                ฿{product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="prose prose-invert border-t border-white/10 pt-8 mb-8">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-lg text-gray-300 leading-relaxed font-light">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-center space-x-4 mb-8">
                            <div className={`flex items-center px-3 py-1 rounded bg-black/40 border ${product.stock > 0 ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                                <div className={`h-2 w-2 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
                                <span className="text-sm font-bold uppercase tracking-wide">
                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <button
                                type="button"
                                className="flex-1 bg-white text-black border border-transparent rounded-lg py-4 px-8 flex items-center justify-center text-base font-bold uppercase tracking-wider hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                className="flex-1 bg-transparent border border-white/20 rounded-lg py-4 px-8 flex items-center justify-center text-base font-bold text-white uppercase tracking-wider hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-purple-500 transition-all"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
