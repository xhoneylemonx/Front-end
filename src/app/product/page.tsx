import Link from "next/link";
import { Product } from "@/types/product";

// Mock Data - Gaming Gear
const products: Product[] = [
    {
        id: "1",
        name: "Razer BlackWidow V4 Pro",
        description: "Mechanical gaming keyboard with Razer Chroma RGB, dedicated macro keys, and command dial.",
        price: 8990,
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60",
        category: "Keyboard",
        stock: 5,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Logitech G Pro X Superlight 2",
        description: "Ultra-lightweight wireless gaming mouse designed for esports professionals.",
        price: 5690,
        imageUrl: "https://images.unsplash.com/photo-1615663245857-acda5b2a643e?w=500&auto=format&fit=crop&q=60",
        category: "Mouse",
        stock: 15,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "HyperX Cloud Alpha Wireless",
        description: "DTS Headphone:X Spatial Audio and up to 300 hours of battery life.",
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

export default function ProductListPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
            {/* Background Gradient Element */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight uppercase italic">
                            Level Up Your Gear
                        </h1>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl">
                            Equip yourself with the ultimate gaming arsenal. High-performance peripherals for the dedicated gamer.
                        </p>
                    </div>
                    <Link
                        href="/product/create"
                        className="mt-6 md:mt-0 group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-none text-white bg-purple-600 transition-all duration-300 hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                        <span className="relative flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            ADD NEW GEAR
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id} className="group relative block h-full">
                            <div className="relative h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:-translate-y-2">

                                {/* Image Container */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-800">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 z-10" />
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="inline-flex items-center px-3 py-1 rounded bg-black/80 border border-white/20 text-xs font-bold uppercase tracking-wider text-cyan-400">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col h-[calc(100%-aspect-[4/3])]">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-grow">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 uppercase font-semibold">Price</span>
                                            <span className="text-2xl font-bold text-white tracking-tight">
                                                ฿{product.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white group-hover:bg-purple-600 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
