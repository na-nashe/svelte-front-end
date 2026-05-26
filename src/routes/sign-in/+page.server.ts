import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { signInSchema } from '$lib/schemas/auth';
import { getApiBaseURL } from '$lib/getApiBaseURL';
import { accessTokenCookie, refreshTokenCookie } from '$lib/authCookies';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async () => {
	return { form: await superValidate(zod4(signInSchema)) };
};

export const actions = {
	default: async ({ request, cookies }: RequestEvent) => {
		const form = await superValidate(request, zod4(signInSchema));

		if (!form.valid) return fail(400, { form });

		let response: Response;
		try {
			response = await fetch(`${getApiBaseURL()}/auth/signin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: form.data.email, password: form.data.password })
			});
		} catch {
			return message(form, "Помилка з'єднання з сервером.", { status: 500 });
		}

		if (!response.ok) {
			return message(form, 'Невірний email або пароль.', { status: 400 });
		}

		const accessToken = response.headers.get('Authorization')?.replace('Bearer ', '');
		if (!accessToken) {
			return message(form, 'Помилка входу. Спробуй ще раз.', { status: 500 });
		}

		cookies.set('access_token', accessToken, accessTokenCookie);

		const setCookieHeader = response.headers.get('set-cookie');
		const refreshTokenMatch = setCookieHeader?.match(/refresh_token=([^;]+)/);
		const refreshToken = refreshTokenMatch?.[1];
		if (refreshToken) {
			cookies.set('refresh_token', refreshToken, refreshTokenCookie);
		}

		redirect(303, '/');
	}
};
