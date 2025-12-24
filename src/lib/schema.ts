import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    price: z.number({ invalid_type_error: 'Price must be a number' }).min(0, 'Price must be positive'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    stock: z.number({ invalid_type_error: 'Stock must be a number' }).min(0, 'Stock must be positive'),
    imageUrl: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
