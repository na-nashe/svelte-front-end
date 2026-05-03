import type { AlternativeSearchRequest, AlternativeSearchResponse } from './types';

export async function searchAlternatives(
	request: AlternativeSearchRequest
): Promise<AlternativeSearchResponse> {
	const res = await fetch('/api/alternatives/search', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request)
	});
	if (!res.ok) throw new Error(`Помилка пошуку: ${res.status}`);
	return res.json() as Promise<AlternativeSearchResponse>;
}
