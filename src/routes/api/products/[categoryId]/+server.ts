import { json } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const headers: Record<string, string> = {};
	if (locals.token) {
		headers['Authorization'] = `Bearer ${locals.token}`;
	}

	const res = await fetch(`${getApiBaseURL()}/products/${params.categoryId}`, { headers });
	const data = await res.json();
	return json(data, { status: res.status });
};
