import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { signUpSchema } from '$lib/schemas/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';

export const load = async () => {
	return { form: await superValidate(zod4(signUpSchema)) };
};

export const actions = {
	default: async ({ request, fetch }: RequestEvent) => {
		const form = await superValidate(request, zod4(signUpSchema));

		if (!form.valid) return fail(400, { form });

		let response: Response;
		try {
			response = await fetch(`${getApiBaseURL()}/auth/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: form.data.username,
					email: form.data.email,
					password: form.data.password
				})
			});
		} catch {
			return message(form, "Помилка з'єднання з сервером.", { status: 500 });
		}

		if (!response.ok) {
			return message(form, 'Помилка реєстрації. Спробуй ще раз.', { status: 400 });
		}
		redirect(303, '/sign-in');
	}
};
