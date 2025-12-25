import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types/product';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/products.json');

export const getProducts = async (): Promise<Product[]> => {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading products:", error);
        return [];
    }
};

export const saveProducts = async (products: Product[]) => {
    try {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(products, null, 4), 'utf-8');
    } catch (error) {
        console.error("Error saving products:", error);
        throw error;
    }
};

export const addProduct = async (product: Product) => {
    const products = await getProducts();
    await saveProducts([product, ...products]);
};

export const updateProduct = async (updatedProduct: Product) => {
    const products = await getProducts();
    const index = products.findIndex((p) => String(p.id) === String(updatedProduct.id));
    if (index !== -1) {
        products[index] = updatedProduct;
        await saveProducts(products);
        return true;
    }
    return false;
};

export const deleteProduct = async (id: string) => {
    const products = await getProducts();
    const newProducts = products.filter((p) => String(p.id) !== String(id));
    if (newProducts.length !== products.length) {
        await saveProducts(newProducts);
        return true;
    }
    return false;
};
