import { json, type RequestEvent } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';

export async function POST({ request }: RequestEvent) {
	try {
		const body = await request.json();

		const javaResponse = await fetch(`${getApiBaseURL()}/auth/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		const result = await javaResponse.json();
		return json(result, { status: javaResponse.status });
	} catch {
		return json({ error: "Помилка з'єднання з сервером" }, { status: 500 });
	}
}