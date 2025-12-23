import { Product } from "@/types/product";

const STORAGE_KEY = 'gaming_store_products';

const initialProducts: Product[] = [
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

export const getProducts = (): Product[] => {
    if (typeof window === 'undefined') return initialProducts;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // Initialize storage with mock data if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse products", e);
        return initialProducts;
    }
};

export const saveProducts = (products: Product[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product) => {
    const products = getProducts();
    const newProducts = [product, ...products];
    saveProducts(newProducts);
};
