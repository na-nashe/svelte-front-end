import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { HandleFetch } from '@sveltejs/kit';

const API_PREFIX = '/api';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const url = new URL(request.url);
	if (url.pathname.startsWith(API_PREFIX)) {
		const backendPath = url.pathname.slice(API_PREFIX.length);
		return fetch(new Request(getApiBaseURL() + backendPath + url.search, request));
	}
	return fetch(request);
};
