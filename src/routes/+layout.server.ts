import type { LayoutServerLoad } from './$types';
import { fetchCategories } from '$lib/entities/category/api';
<<<<<<< Updated upstream
import { getApiBaseURL } from '$lib/getApiBaseURL';

export const load: LayoutServerLoad = async ({ fetch }) => {
	try {
		const categories = await fetchCategories(fetch, getApiBaseURL());
		return { categories };
	} catch (e) {
		console.error('[layout] Failed to fetch categories:', e);
		return { categories: [] };
	}
=======
import { fetchAlternativesSummary } from '$lib/entities/alternative/api';
import { getApiBaseURL } from '$lib/getApiBaseURL';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const apiBase = getApiBaseURL();

	const [categoriesResult, summaryResult] = await Promise.allSettled([
		fetchCategories(fetch, apiBase),
		fetchAlternativesSummary(fetch, apiBase)
	]);

	const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
	const alternativesTotal = summaryResult.status === 'fulfilled' ? summaryResult.value.total : null;

	if (categoriesResult.status === 'rejected') {
		console.error('[layout] Failed to fetch categories:', categoriesResult.reason);
	}
	if (summaryResult.status === 'rejected') {
		console.error('[layout] Failed to fetch alternatives summary:', summaryResult.reason);
	}

	return { categories, alternativesTotal };
>>>>>>> Stashed changes
};
