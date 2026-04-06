import type { LayoutServerLoad } from './$types';
import { fetchCategories } from '$lib/entities/category/api';
import { env } from '$env/dynamic/private';

const API_BASE = env.BACKEND_URL ?? 'http://localhost:8080';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const categories = await fetchCategories(fetch, API_BASE);
		return { categories };
	} catch (e) {
		console.error('[layout] Failed to fetch categories:', e);
		return { categories: [] };
	}
};
