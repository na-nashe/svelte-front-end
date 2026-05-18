import type { ApiProduct } from './types';

export async function fetchProducts(fetchFn: typeof fetch): Promise<ApiProduct[]> {
	const res = await fetchFn('/api/products');
	if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
	return res.json() as Promise<ApiProduct[]>;
}

export async function fetchProductsByCategory(
	fetchFn: typeof fetch,
	categoryId: number
): Promise<ApiProduct[]> {
	const res = await fetchFn(`/api/products/${categoryId}`);
	if (!res.ok) throw new Error(`Failed to fetch products for category ${categoryId}: ${res.status}`);
	return res.json() as Promise<ApiProduct[]>;
}
