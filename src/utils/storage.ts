import { Product } from "@/types/product";

const STORAGE_KEY = 'general_store_products';

const initialProducts: Product[] = [
    {
        id: "1",
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling headphones with Auto NC Optimizer and up to 30-hour battery life.",
        price: 14990,
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        stock: 24,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Nike Air Zoom Pegasus 40",
        description: "A springy ride for every run, familiar, just for you. The Pegasus returns to help you ascend to new heights.",
        price: 5200,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        stock: 12,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Minimalist Coffee Table",
        description: "Modern wooden coffee table with storage shelf, perfect for living rooms with a clean aesthetic.",
        price: 3500,
        imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&auto=format&fit=crop&q=60",
        category: "Home & Living",
        stock: 5,
        createdAt: new Date().toISOString(),
    },
    {
        id: "4",
        name: "Ceramic Vase Set",
        description: "Handcrafted ceramic vases in neutral tones, ideal for dried flowers or standalone decor.",
        price: 1290,
        imageUrl: "https://images.unsplash.com/photo-1581783342308-f792ca11df53?w=500&auto=format&fit=crop&q=60",
        category: "Home & Living",
        stock: 8,
        createdAt: new Date().toISOString(),
    },
    {
        id: "5",
        name: "Instax Mini 12",
        description: "Compact instant camera with automatic exposure and selfie mode. Capture moments instantly.",
        price: 2690,
        imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60",
        category: "Electronics",
        stock: 15,
        createdAt: new Date().toISOString(),
    },
    {
        id: "6",
        name: "Organic Cotton T-Shirt",
        description: "Essential crewneck t-shirt made from 100% organic cotton for everyday comfort.",
        price: 490,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
        category: "Fashion",
        stock: 50,
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
