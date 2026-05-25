import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { PageServerLoad } from './$types';
import type { ApiProduct, ApiAlternative } from '$lib/entities/product/types';
import { db } from '$lib/db';
import { reviews } from '$lib/db/schema';
import { avg, count, inArray } from 'drizzle-orm';
import { SPOTLIGHT_BRANDS } from '$lib/data/ukrainian-brands';
import type { CatalogBrand } from '$lib/data/ukrainian-brands';

const PALETTE = [
	'#0057B7',
	'#FFD700',
	'#3A76F0',
	'#25D366',
	'#FF6B00',
	'#6D4AFF',
	'#00B956',
	'#E4405F',
	'#FB542B',
	'#34D186'
];

function colorFromName(name: string): string {
	let hash = 0;
	for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
	return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initialsFromName(name: string): string {
	const parts = name.trim().split(/\s+/);
	return parts.length > 1
		? (parts[0][0] + parts[1][0]).toUpperCase()
		: name.slice(0, 2).toUpperCase();
}

function isUkrainian(country: string): boolean {
	const c = country.trim().toLowerCase();
	return (
		c === '🇺🇦' || c === 'ukraine' || c === 'ua' || c.includes('україн') || c.includes('ukrain')
	);
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.token) {
		return { catalogBrands: [] as CatalogBrand[], isAuthenticated: false, spotlightBrands: SPOTLIGHT_BRANDS };
	}

	let products: ApiProduct[] = [];
	try {
		const res = await fetch(`${getApiBaseURL()}/products`, {
			headers: { Authorization: `Bearer ${locals.token}` }
		});
		if (res.ok) products = await res.json();
	} catch (e) {
		console.error('[ukrainian-brands] Error fetching products:', e);
	}

	const altEntries: { alt: ApiAlternative; product: ApiProduct }[] = [];
	for (const product of products) {
		for (const alt of product.alternatives) {
			if (isUkrainian(alt.country)) {
				altEntries.push({ alt, product });
			}
		}
	}

	const altIds = altEntries.map((e) => e.alt.id);
	const ratingMap = new Map<number, { avg: number; count: number }>();
	if (altIds.length > 0) {
		try {
			const rows = await db
				.select({
					alternativeId: reviews.alternativeId,
					avgRating: avg(reviews.rating),
					reviewCount: count(reviews.id)
				})
				.from(reviews)
				.where(inArray(reviews.alternativeId, altIds))
				.groupBy(reviews.alternativeId);
			for (const r of rows) {
				ratingMap.set(r.alternativeId, {
					avg: parseFloat(r.avgRating ?? '0'),
					count: r.reviewCount
				});
			}
		} catch (e) {
			console.error('[ukrainian-brands] Error fetching ratings:', e);
		}
	}

	const seen = new Set<string>();
	const catalogBrands: CatalogBrand[] = [];

	for (const { alt, product } of altEntries) {
		if (seen.has(alt.name)) continue;
		seen.add(alt.name);
		const stats = ratingMap.get(alt.id);
		catalogBrands.push({
			id: alt.id,
			name: alt.name,
			description: alt.description ?? '',
			url: alt.url,
			pricingModel: alt.pricing_model,
			rating: stats?.avg ?? alt.avg_rating ?? 0,
			reviewCount: stats?.count ?? alt.review_count ?? 0,
			letter: initialsFromName(alt.name),
			color: colorFromName(alt.name),
			category: product.category,
			replacesProduct: product.name,
			replacesFlag: product.origin
		});
	}

	return { catalogBrands, isAuthenticated: true, spotlightBrands: SPOTLIGHT_BRANDS };
};
