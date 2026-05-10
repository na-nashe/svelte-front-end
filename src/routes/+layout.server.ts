import type { LayoutServerLoad } from './$types';
import { fetchCategories } from '$lib/entities/category/api';
import { fetchAlternativesSummary } from '$lib/entities/alternative/api';

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
	const [categoriesResult, summaryResult] = await Promise.allSettled([
		fetchCategories(fetch),
		fetchAlternativesSummary(fetch)
	]);

	const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
	const alternativesTotal = summaryResult.status === 'fulfilled' ? summaryResult.value.total : null;

	if (categoriesResult.status === 'rejected') {
		console.error('[layout] Failed to fetch categories:', categoriesResult.reason);
	}
	if (summaryResult.status === 'rejected') {
		console.error('[layout] Failed to fetch alternatives summary:', summaryResult.reason);
	}

	return { categories, alternativesTotal, isAuthenticated: locals.isAuthenticated };
};
