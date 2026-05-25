import { error, redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/db';
import { products, alternatives, productAlternatives, countries } from '$lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { checkRateLimit } from '$lib/server/rateLimit';
import { validateAlternative } from '$lib/services/validateAlternative';
import type { Actions, PageServerLoad } from './$types';

const BLOCKED_COUNTRY_NAMES = ['russia', 'росія', 'беларусь', 'belarus', 'білорусь', 'byelorussia'];

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.token) redirect(303, '/sign-in');

	const productId = parseInt(params.productId);
	if (isNaN(productId)) throw error(400, 'Invalid product ID');

	const [product] = await db
		.select({ id: products.id, name: products.name, categoryId: products.categoryId })
		.from(products)
		.where(eq(products.id, productId))
		.limit(1);

	if (!product) throw error(404, 'Product not found');

	const allCountries = await db
		.select({ id: countries.id, name: countries.name })
		.from(countries)
		.orderBy(countries.name);

	const countryList = allCountries.filter(
		(c) => !BLOCKED_COUNTRY_NAMES.includes(c.name.toLowerCase())
	);

	return { product, countries: countryList };
};

export const actions: Actions = {
	default: async ({ params, request, locals, getClientAddress }) => {
		if (!locals.token) redirect(303, '/sign-in');

		const ip = getClientAddress();
		const { allowed } = checkRateLimit(`add-alt:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
		if (!allowed) {
			return fail(429, { error: 'Забагато запитів. Спробуйте через годину.' });
		}

		const productId = parseInt(params.productId);
		if (isNaN(productId)) throw error(400, 'Invalid product ID');

		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const countryId = parseInt(data.get('countryId') as string);
		const pricingModel = data.get('pricingModel') as string;
		const description = (data.get('description') as string)?.trim() || null;
		const url = (data.get('url') as string)?.trim() || null;

		if (!name) return fail(400, { error: "Назва є обов'язковою" });
		if (isNaN(countryId)) return fail(400, { error: 'Оберіть країну' });
		if (!['FREE', 'PAID', 'FREEMIUM'].includes(pricingModel)) {
			return fail(400, { error: 'Невірна модель ціноутворення' });
		}

		const validation = await validateAlternative(name, url);
		if (!validation.valid) {
			return fail(422, {
				error: validation.reason || 'Альтернатива не пройшла перевірку'
			});
		}

		const [product] = await db
			.select({ categoryId: products.categoryId })
			.from(products)
			.where(eq(products.id, productId))
			.limit(1);

		if (!product) throw error(404, 'Product not found');

		const [newAlt] = await db
			.insert(alternatives)
			.values({
				name,
				categoryId: product.categoryId,
				originId: countryId,
				pricingModel: sql`${pricingModel}::pricing_model_enum` as unknown as 'FREE' | 'PAID' | 'FREEMIUM',
				description,
				url,
				aiGenerated: false
			})
			.returning({ id: alternatives.id });

		await db.insert(productAlternatives).values({
			productId,
			alternativeId: newAlt.id
		});

		redirect(303, '/catalog');
	}
};
