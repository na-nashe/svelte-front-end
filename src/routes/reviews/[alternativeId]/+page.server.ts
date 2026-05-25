import { error } from '@sveltejs/kit';
import { db } from '$lib/db';
import {
	reviews,
	users,
	alternatives,
	countries,
	reviewSummaries,
	reviewVotes
} from '$lib/db/schema';
import { eq, desc, inArray, and, sql } from 'drizzle-orm';
import { decodeJwtSub } from '$lib/server/jwt';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const altId = parseInt(params.alternativeId);
	if (isNaN(altId)) throw error(400, 'Invalid ID');

	const [alt] = await db
		.select({
			id: alternatives.id,
			name: alternatives.name,
			description: alternatives.description,
			url: alternatives.url,
			pricing_model: alternatives.pricingModel,
			country: countries.name
		})
		.from(alternatives)
		.innerJoin(countries, eq(alternatives.originId, countries.id))
		.where(eq(alternatives.id, altId))
		.limit(1);

	if (!alt) throw error(404, 'Alternative not found');

	const [summaryRow, reviewRows] = await Promise.all([
		db
			.select({ summary: reviewSummaries.summary, updatedAt: reviewSummaries.updatedAt })
			.from(reviewSummaries)
			.where(eq(reviewSummaries.alternativeId, altId))
			.limit(1)
			.then((r) => r[0] ?? null),
		db
			.select({
				id: reviews.id,
				userId: reviews.userId,
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
			.where(eq(reviews.alternativeId, altId))
			.orderBy(desc(reviews.timestamp))
	]);

	const currentUserId = locals.token ? decodeJwtSub(locals.token) : null;
	const myReviewId = currentUserId
		? (reviewRows.find((r) => r.userId === currentUserId)?.id ?? null)
		: null;

	const reviewIds = reviewRows.map((r) => r.id);

	const [voteCountRows, myVoteRows] = await Promise.all([
		reviewIds.length
			? db
					.select({
						reviewId: reviewVotes.reviewId,
						likes: sql<number>`count(*) filter (where ${reviewVotes.value} = 1)`.mapWith(Number),
						dislikes: sql<number>`count(*) filter (where ${reviewVotes.value} = -1)`.mapWith(Number)
					})
					.from(reviewVotes)
					.where(inArray(reviewVotes.reviewId, reviewIds))
					.groupBy(reviewVotes.reviewId)
			: Promise.resolve([]),
		currentUserId && reviewIds.length
			? db
					.select({ reviewId: reviewVotes.reviewId, value: reviewVotes.value })
					.from(reviewVotes)
					.where(
						and(eq(reviewVotes.userId, currentUserId), inArray(reviewVotes.reviewId, reviewIds))
					)
			: Promise.resolve([])
	]);

	const countsById = new Map(voteCountRows.map((v) => [v.reviewId, v]));
	const myVoteById = new Map(myVoteRows.map((v) => [v.reviewId, v.value]));

	return {
		summary: summaryRow
			? { text: summaryRow.summary, updatedAt: new Date(summaryRow.updatedAt).toISOString() }
			: null,
		alternative: { ...alt, pricing_model: alt.pricing_model?.toLowerCase() ?? null },
		myReviewId,
		reviews: reviewRows.map((r) => ({
			id: r.id,
			username: r.username,
			avatar: r.avatar,
			rating: r.rating,
			title: r.title,
			content: r.content,
			pros: r.pros ?? [],
			cons: r.cons ?? [],
			timestamp: new Date(r.timestamp).toISOString(),
			likes: countsById.get(r.id)?.likes ?? 0,
			dislikes: countsById.get(r.id)?.dislikes ?? 0,
			myVote: myVoteById.get(r.id) ?? 0
		})),
		isAuthenticated: !!locals.token
	};
};
