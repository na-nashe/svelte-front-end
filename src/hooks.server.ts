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
	let token = event.cookies.get('access_token');

	if (!token) {
		const refreshToken = event.cookies.get('refresh_token');
		if (refreshToken) {
			try {
				const refreshResponse = await fetch(`${getApiBaseURL()}/auth/accesstoken/refresh`, {
					method: 'POST',
					headers: { Cookie: `refresh_token=${refreshToken}` }
				});
				if (refreshResponse.ok) {
					const newAccessToken = refreshResponse.headers
						.get('Authorization')
						?.replace('Bearer ', '');
					if (newAccessToken) {
						event.cookies.set('access_token', newAccessToken, {
							httpOnly: true,
							secure: true,
							sameSite: 'strict',
							path: '/',
							maxAge: 60 * 15
						});
						token = newAccessToken;
					}
				} else {
					event.cookies.delete('refresh_token', { path: '/' });
				}
			} catch {
				// network error — continue without token
			}
		}
	}

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
