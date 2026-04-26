import { json } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const res = await fetch(`${getApiBaseURL()}/alternatives/summary`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});

	const data = await res.json();
	return json(data, { status: res.status });
};
