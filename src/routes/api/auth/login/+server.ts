import { json, type RequestEvent } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';

export async function POST({ request, cookies }: RequestEvent) {
	try {
		const body = await request.json();

		const javaResponse = await fetch(`${getApiBaseURL()}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (!javaResponse.ok) {
			const err = await javaResponse.json();
			return json(err, { status: javaResponse.status });
		}

		const accessToken = javaResponse.headers.get('Authorization')?.replace('Bearer ', '');

		if (!accessToken) {
			return json({ error: 'Токен не отримано' }, { status: 500 });
		}

		cookies.set('access_token', accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 15
		});

		return json({ ok: true });
	} catch {
		return json({ error: "Помилка з'єднання з сервером" }, { status: 500 });
	}
}