import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/db';
import { productSchema } from '@/lib/schema';
import { Product } from '@/types/product';

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = productSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 });
        }

        const newProduct: Product = {
            id: Date.now().toString(),
            name: validation.data.name,
            price: validation.data.price,
            category: validation.data.category,
            description: validation.data.description,
            imageUrl: validation.data.imageUrl || "https://images.unsplash.com/photo-1511556820780-dba9ba36abe3?w=500&auto=format&fit=crop&q=60",
            stock: validation.data.stock,
            createdAt: new Date().toISOString(),
        };

        await addProduct(newProduct);
        return NextResponse.json(newProduct, { status: 201 });

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
