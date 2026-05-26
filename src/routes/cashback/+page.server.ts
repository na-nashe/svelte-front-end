import { db } from '$lib/db';
import { alternatives, countries, categories } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { CB } from '$lib/entities/cashback/data';
import type { CashbackProduct } from '$lib/entities/cashback/data';
import type { PageServerLoad } from './$types';

const PALETTE = [
	'#3A76F0', '#7360F2', '#25D366', '#EA4335',
	'#FF6B00', '#6D4AFF', '#00B956', '#E4405F', '#FB542B', '#34D186'
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

export const load: PageServerLoad = async () => {
	let catalogProducts: CashbackProduct[] = [];

	try {
		const rows = await db
			.select({
				name: alternatives.name,
				categoryName: categories.name,
				countryName: countries.name,
				cashbackInfo: alternatives.cashbackInfo
			})
			.from(alternatives)
			.leftJoin(countries, eq(alternatives.originId, countries.id))
			.leftJoin(categories, eq(alternatives.categoryId, categories.id))
			.where(eq(alternatives.isCashbackAvailable, true))
			.limit(100);

		catalogProducts = rows.map((r) => ({
			name: r.name,
			cat: r.categoryName ?? 'Інше',
			pct: 10,
			brand: r.name,
			origin: r.countryName ?? 'Україна',
			L: initialsFromName(r.name),
			cl: colorFromName(r.name),
			v: true,
			pop: false
		}));
	} catch (e) {
		console.error('[cashback] DB load failed:', e);
	}

	// Fall back to static data when DB has no cashback rows yet
	return {
		catalogProducts: catalogProducts.length > 0 ? catalogProducts : CB
	};
};
