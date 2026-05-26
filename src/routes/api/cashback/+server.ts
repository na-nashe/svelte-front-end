import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { alternatives, countries, categories } from '$lib/db/schema';
import { ilike, eq, and } from 'drizzle-orm';
import { generateText, stepCountIs } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { env } from '$env/dynamic/private';
import type { CashbackProduct } from '$lib/entities/cashback/data';
import type { RequestHandler } from './$types';

const PALETTE = [
	'#3A76F0',
	'#7360F2',
	'#25D366',
	'#EA4335',
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

function dbRowToProduct(r: {
	name: string;
	categoryName: string | null;
	countryName: string | null;
	cashbackInfo: string | null;
}): CashbackProduct {
	return {
		name: r.name,
		cat: r.categoryName ?? 'Інше',
		pct: 10,
		brand: r.name,
		origin: r.countryName ?? 'Україна',
		L: initialsFromName(r.name),
		cl: colorFromName(r.name),
		v: true,
		pop: false
	};
}

async function queryDb(q?: string): Promise<CashbackProduct[]> {
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
		.where(
			q
				? and(eq(alternatives.isCashbackAvailable, true), ilike(alternatives.name, `%${q}%`))
				: eq(alternatives.isCashbackAvailable, true)
		)
		.limit(q ? 5 : 100);

	return rows.map(dbRowToProduct);
}

async function searchWithAI(query: string): Promise<CashbackProduct | null> {
	const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });

	const { text } = await generateText({
		model: openai.responses('gpt-4o-mini'),
		tools: { webSearch: openai.tools.webSearchPreview({}) },
		stopWhen: stepCountIs(3),
		prompt: `Через веб-пошук визнач: чи "${query}" є фізичним продуктом та чи це вироблено в Україні - якщо так, то вертай true та відсоток 10.

Відповідай ТІЛЬКИ JSON без markdown:
{"found": boolean, "name": string, "brand": string, "category": string, "origin": string, "pct": number}`
	});

	const parsed = JSON.parse(text.trim().replace(/^```json\n?|```$/g, ''));
	console.log(text);
	if (!parsed.found) return null;

	return {
		name: parsed.name || query,
		cat: parsed.category || 'Інше',
		pct: parsed.pct || 10,
		brand: parsed.brand || parsed.name || query,
		origin: parsed.origin || 'Україна',
		L: initialsFromName(parsed.name || query),
		cl: colorFromName(parsed.name || query),
		v: true,
		pop: false,
		aiFound: true
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.trim() || undefined;

	// 1. Query DB
	const dbResults = await queryDb(q);
	if (dbResults.length > 0) return json(dbResults);

	// 2. No query → nothing to AI-search, return empty
	if (!q) return json([]);

	// 3. AI web search fallback
	try {
		const aiResult = await searchWithAI(q);
		return json(aiResult ? [aiResult] : []);
	} catch (e) {
		console.error('[cashback] AI search failed:', e);
		return json([]);
	}
};
