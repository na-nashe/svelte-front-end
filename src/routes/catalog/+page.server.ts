import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { PageServerLoad } from './$types';
import type { ApiProduct } from '$lib/entities/product/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.token) {
		return { products: [] as ApiProduct[] };
	}

	try {
		const res = await fetch(`${getApiBaseURL()}/products`, {
			headers: { Authorization: `Bearer ${locals.token}` }
		});
		if (!res.ok) {
			console.error('[catalog] Failed to fetch products:', res);
			return { products: [] as ApiProduct[] };
		}
		const products: ApiProduct[] = await res.json();

		console.log('products', products);
		return { products };
	} catch (e) {
		console.error('[catalog] Error fetching products:', e);
		return { products: [] as ApiProduct[] };
	}
};
