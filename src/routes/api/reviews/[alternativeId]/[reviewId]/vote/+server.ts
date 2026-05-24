import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { reviews, reviewVotes } from '$lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { decodeJwtSub } from '$lib/server/jwt';
import type { RequestHandler } from './$types';

async function counts(reviewId: number) {
	const [row] = await db
		.select({
			likes: sql<number>`count(*) filter (where ${reviewVotes.value} = 1)`.mapWith(Number),
			dislikes: sql<number>`count(*) filter (where ${reviewVotes.value} = -1)`.mapWith(Number)
		})
		.from(reviewVotes)
		.where(eq(reviewVotes.reviewId, reviewId));
	return { likes: row?.likes ?? 0, dislikes: row?.dislikes ?? 0 };
}

async function resolve(
	token: string | null,
	reviewId: number,
	altId: number
): Promise<{ userId: string } | { error: Response }> {
	if (!token) return { error: json({ message: 'Unauthorized' }, { status: 401 }) };
	const userId = decodeJwtSub(token);
	if (!userId) return { error: json({ message: 'Invalid token' }, { status: 401 }) };

	const [review] = await db
		.select({ id: reviews.id })
		.from(reviews)
		.where(and(eq(reviews.id, reviewId), eq(reviews.alternativeId, altId)))
		.limit(1);

	if (!review) return { error: json({ message: 'Review not found' }, { status: 404 }) };

	return { userId };
}

export const POST: RequestHandler = async ({ params, request, locals }) => {
	const altId = parseInt(params.alternativeId);
	const reviewId = parseInt(params.reviewId);
	if (isNaN(altId) || isNaN(reviewId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const result = await resolve(locals.token, reviewId, altId);
	if ('error' in result) return result.error;

	const { value } = await request.json();
	if (value !== 1 && value !== -1) {
		return json({ message: 'Value must be 1 or -1' }, { status: 400 });
	}

	await db
		.insert(reviewVotes)
		.values({ reviewId, userId: result.userId, value })
		.onConflictDoUpdate({
			target: [reviewVotes.reviewId, reviewVotes.userId],
			set: { value }
		});

	return json({ myVote: value, ...(await counts(reviewId)) });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const altId = parseInt(params.alternativeId);
	const reviewId = parseInt(params.reviewId);
	if (isNaN(altId) || isNaN(reviewId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const result = await resolve(locals.token, reviewId, altId);
	if ('error' in result) return result.error;

	await db
		.delete(reviewVotes)
		.where(and(eq(reviewVotes.reviewId, reviewId), eq(reviewVotes.userId, result.userId)));

	return json({ myVote: 0, ...(await counts(reviewId)) });
};
