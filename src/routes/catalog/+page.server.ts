import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { PageServerLoad } from './$types';
import type { ApiProduct } from '$lib/entities/product/types';
import type { Category } from '$lib/entities/category/types';
import { db } from '$lib/db';
import { reviews } from '$lib/db/schema';
import { avg, count, inArray } from 'drizzle-orm';

async function attachRatings(products: ApiProduct[]): Promise<ApiProduct[]> {
	const altIds = products.flatMap((p) => p.alternatives.map((a) => a.id));
	if (altIds.length === 0) return products;

	const rows = await db
		.select({
			alternativeId: reviews.alternativeId,
			avgRating: avg(reviews.rating),
			reviewCount: count(reviews.id)
		})
		.from(reviews)
		.where(inArray(reviews.alternativeId, altIds))
		.groupBy(reviews.alternativeId);

	const ratingMap = new Map(
		rows.map((r) => [r.alternativeId, { avg: parseFloat(r.avgRating ?? '0'), count: r.reviewCount }])
	);

	return products.map((p) => ({
		...p,
		alternatives: p.alternatives.map((a) => {
			const stats = ratingMap.get(a.id);
			return { ...a, avg_rating: stats?.avg ?? 0, review_count: stats?.count ?? 0 };
		})
	}));
}

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
		const enriched = await attachRatings(products);
		return { products: enriched, categories, initialCat, isAuthenticated: true };
	} catch (e) {
		console.error('[catalog] Error fetching products:', e);
		return { products: [] as ApiProduct[], categories, initialCat, isAuthenticated: true };
	}
};
