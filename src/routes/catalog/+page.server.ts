import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { PageServerLoad } from './$types';
import type { ApiProduct } from '$lib/entities/product/types';
import type { Category } from '$lib/entities/category/types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const initialCat = url.searchParams.get('cat');

	let categories: Category[] = [];
	try {
		const res = await fetch(`${getApiBaseURL()}/categories`);
		if (res.ok) categories = await res.json();
	} catch (e) {
		console.error('[catalog] Error fetching categories:', e);
	}

	if (!locals.token) {
		return { products: [] as ApiProduct[], categories, initialCat, isAuthenticated: false };
	}

	try {
		const res = await fetch(`${getApiBaseURL()}/products`, {
			headers: { Authorization: `Bearer ${locals.token}` }
		});
		if (!res.ok) {
			console.error('[catalog] Failed to fetch products:', res);
			return { products: [] as ApiProduct[], categories, initialCat, isAuthenticated: true };
		}
		const products: ApiProduct[] = await res.json();
		return { products, categories, initialCat, isAuthenticated: true };
	} catch (e) {
		console.error('[catalog] Error fetching products:', e);
		return { products: [] as ApiProduct[], categories, initialCat, isAuthenticated: true };
	}
};
