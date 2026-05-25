import { getApiBaseURL } from '$lib/getApiBaseURL';
import type { RequestEvent } from '@sveltejs/kit';

export const load = async ({ url }: RequestEvent) => {
	const token = url.searchParams.get('token');

	if (!token) {
		return { success: false, reason: 'missing_token' };
	}

	try {
		const response = await fetch(
			`${getApiBaseURL()}/auth/email/verify?token=${encodeURIComponent(token)}`
		);
		if (response.ok) {
			return { success: true };
		}
		return { success: false, reason: 'invalid_token' };
	} catch {
		return { success: false, reason: 'server_error' };
	}
};
