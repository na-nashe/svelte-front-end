import { json } from '@sveltejs/kit';
import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const res = await fetch(`${getApiBaseURL()}/categories`);
	const data = await res.json();
	return json(data, { status: res.status });
};
