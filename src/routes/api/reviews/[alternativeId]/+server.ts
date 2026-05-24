import { json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { reviews, users } from '$lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { decodeJwtSub } from '$lib/server/jwt';
import { regenerateSummary } from '$lib/services/summarize';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const altId = parseInt(params.alternativeId);
	if (isNaN(altId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const rows = await db
		.select({
			id: reviews.id,
			username: users.username,
			avatar: users.avatar,
			rating: reviews.rating,
			title: reviews.title,
			content: reviews.content,
			pros: reviews.pros,
			cons: reviews.cons,
			timestamp: reviews.timestamp
		})
		.from(reviews)
		.innerJoin(users, eq(reviews.userId, users.id))
		.where(eq(reviews.alternativeId, altId));

	return json(rows.map((r) => ({ ...r, timestamp: new Date(r.timestamp).toISOString() })));
};

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.token) return json({ message: 'Unauthorized' }, { status: 401 });

	const userId = decodeJwtSub(locals.token);
	if (!userId) return json({ message: 'Invalid token' }, { status: 401 });

	const altId = parseInt(params.alternativeId);
	if (isNaN(altId)) return json({ message: 'Invalid ID' }, { status: 400 });

	const body = await request.json();
	const { rating, title, content, pros, cons } = body;

	if (!rating || rating < 1 || rating > 5) {
		return json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
	}

	const existing = await db
		.select({ id: reviews.id })
		.from(reviews)
		.where(and(eq(reviews.userId, userId), eq(reviews.alternativeId, altId)))
		.limit(1);

	if (existing.length > 0) {
		return json({ message: 'You have already reviewed this alternative' }, { status: 409 });
	}

	const [user] = await db
		.select({ username: users.username, avatar: users.avatar })
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (!user) return json({ message: 'User not found' }, { status: 401 });

	const [review] = await db
		.insert(reviews)
		.values({
			userId,
			alternativeId: altId,
			rating,
			title: title ?? null,
			content: content ?? null,
			pros: pros ?? [],
			cons: cons ?? [],
			timestamp: new Date().toISOString()
		})
		.returning();

	regenerateSummary(altId).catch(console.error);

	return json(
		{
			id: review.id,
			username: user.username,
			avatar: user.avatar,
			rating: review.rating,
			title: review.title,
			content: review.content,
			pros: review.pros ?? [],
			cons: review.cons ?? [],
			timestamp: new Date(review.timestamp).toISOString()
		},
		{ status: 201 }
	);
};
