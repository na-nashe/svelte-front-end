import { getApiBaseURL } from '$lib/getApiBaseURL';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const API_PREFIX = '/api';
const PROTECTED_ROUTES = ['/profile'];
const AUTH_ONLY_ROUTES = ['/sign-in', '/sign-up'];

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const url = new URL(request.url);
	if (url.pathname.startsWith(API_PREFIX)) {
		const backendPath = url.pathname.slice(API_PREFIX.length);
		return fetch(new Request(getApiBaseURL() + backendPath + url.search, request));
	}
	return fetch(request);
};

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('access_token');
	event.locals.token = token ?? null;
	event.locals.isAuthenticated = !!token;

	const pathname = event.url.pathname;

	const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
	if (isProtected && !token) {
		redirect(303, '/sign-in');
	}

	const isAuthOnly = AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route));
	if (isAuthOnly && token) {
		redirect(303, '/');
	}

	return resolve(event);
};

export const handle = sequence(authHandle);
