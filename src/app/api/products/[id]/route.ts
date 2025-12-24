import { NextResponse } from 'next/server';
import { getProducts, updateProduct, deleteProduct } from '@/lib/db';
import { productSchema } from '@/lib/schema';
import { Product } from '@/types/product';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const products = await getProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const body = await request.json();
        const validation = productSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const existingProducts = await getProducts();
        const existingProduct = existingProducts.find((p) => p.id === id);

        if (!existingProduct) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const updatedProduct: Product = {
            ...existingProduct,
            name: validation.data.name,
            price: validation.data.price,
            category: validation.data.category,
            description: validation.data.description,
            imageUrl: validation.data.imageUrl || existingProduct.imageUrl,
            stock: validation.data.stock,
        };

        const success = await updateProduct(updatedProduct);

        if (!success) {
            return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
        }

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const success = await deleteProduct(id);

        if (!success) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
