import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '$lib/db';
import { users, reviews, reviewVotes } from '$lib/db/schema';
import { decodeJwtSub } from '$lib/server/jwt';
import type { Actions, PageServerLoad } from './$types';

const usernameSchema = z.string().trim().min(2, "Ім'я має містити мінімум 2 символи").max(50);
const emailSchema = z.string().trim().email('Невірний формат email').max(255);

function requireUserId(token: string | null): string {
	const userId = token && decodeJwtSub(token);
	if (!userId) redirect(303, '/sign-in');
	return userId;
}

export const load: PageServerLoad = async ({ locals }) => {
	const userId = requireUserId(locals.token);

	const [user] = await db
		.select({ id: users.id, username: users.username, email: users.email, avatar: users.avatar })
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (!user) error(404, 'Користувача не знайдено');

	return { user };
};

export const actions: Actions = {
	updateUsername: async ({ request, locals }) => {
		const userId = requireUserId(locals.token);
		const form = await request.formData();

		const parsed = usernameSchema.safeParse(form.get('username'));
		if (!parsed.success) {
			return fail(400, { field: 'username', error: parsed.error.issues[0].message });
		}

		await db.update(users).set({ username: parsed.data }).where(eq(users.id, userId));
		return { field: 'username', success: true, username: parsed.data };
	},

	updateEmail: async ({ request, locals }) => {
		const userId = requireUserId(locals.token);
		const form = await request.formData();

		const parsed = emailSchema.safeParse(form.get('email'));
		if (!parsed.success) {
			return fail(400, { field: 'email', error: parsed.error.issues[0].message });
		}

		await db.update(users).set({ email: parsed.data }).where(eq(users.id, userId));
		return { field: 'email', success: true, email: parsed.data };
	},

	deleteAccount: async ({ locals, cookies }) => {
		const userId = requireUserId(locals.token);

		await db.delete(reviewVotes).where(eq(reviewVotes.userId, userId));
		await db.delete(reviews).where(eq(reviews.userId, userId));
		await db.delete(users).where(eq(users.id, userId));

		cookies.delete('access_token', { path: '/' });
		redirect(303, '/');
	}
};
