import type { LayoutServerLoad } from './$types';
import { fetchCategories } from '$lib/entities/category/api';
import { getApiBaseURL } from '$lib/getApiBaseURL';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const categories = await fetchCategories(fetch, getApiBaseURL());
		return { categories };
	} catch (e) {
		console.error('[layout] Failed to fetch categories:', e);
		return { categories: [] };
	}
};
