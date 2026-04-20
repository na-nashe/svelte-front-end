import { env } from '$env/dynamic/private';

export function getApiBaseURL() {
	return env.BACKEND_URL ?? 'http://localhost:8080';
	return API_BASE;
}
