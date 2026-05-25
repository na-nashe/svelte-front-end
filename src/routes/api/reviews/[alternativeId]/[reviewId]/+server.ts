import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { reviews } from '$lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { decodeJwtSub } from '$lib/server/jwt';
import { regenerateSummary } from '$lib/services/summarize';
import type { RequestHandler } from './$types';

async function resolveOwnership(
	token: string | null,
	reviewId: number,
	altId: number
): Promise<{ userId: string; review: typeof reviews.$inferSelect } | { error: Response }> {
	if (!token) return { error: json({ message: 'Unauthorized' }, { status: 401 }) };
	const userId = decodeJwtSub(token);
	if (!userId) return { error: json({ message: 'Invalid token' }, { status: 401 }) };

	const [review] = await db
		.select()
		.from(reviews)
		.where(and(eq(reviews.id, reviewId), eq(reviews.alternativeId, altId)))
		.limit(1);

	if (!review) return { error: json({ message: 'Review not found' }, { status: 404 }) };
	if (review.userId !== userId) return { error: json({ message: 'Forbidden' }, { status: 403 }) };

	return { userId, review };
}

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	const altId = parseInt(params.alternativeId);
	const reviewId = parseInt(params.reviewId);
	if (isNaN(altId) || isNaN(reviewId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const result = await resolveOwnership(locals.token, reviewId, altId);
	if ('error' in result) return result.error;

	const { rating, title, content, pros, cons } = await request.json();

	if (rating !== undefined && (rating < 1 || rating > 5)) {
		return json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
	}

	const [updated] = await db
		.update(reviews)
		.set({
			...(rating !== undefined && { rating }),
			title: title ?? null,
			content: content ?? null,
			pros: pros ?? [],
			cons: cons ?? []
		})
		.where(eq(reviews.id, reviewId))
		.returning();
	try {
		await regenerateSummary(altId);
	} catch (e) {
		console.log('ass', e);
	}

	return json({
		id: updated.id,
		rating: updated.rating,
		title: updated.title,
		content: updated.content,
		pros: updated.pros ?? [],
		cons: updated.cons ?? []
	});
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const altId = parseInt(params.alternativeId);
	const reviewId = parseInt(params.reviewId);
	if (isNaN(altId) || isNaN(reviewId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const result = await resolveOwnership(locals.token, reviewId, altId);
	if ('error' in result) return result.error;

	await db.delete(reviews).where(eq(reviews.id, reviewId));

	regenerateSummary(altId).catch(console.error);

	return new Response(null, { status: 204 });
};
