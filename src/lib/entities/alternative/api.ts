import type { AlternativeSummary } from './types';

export async function fetchAlternativesSummary(fetchFn: typeof fetch = fetch): Promise<AlternativeSummary> {
	const res = await fetchFn(`/api/alternatives/summary`);
	if (!res.ok) throw new Error(`Failed to fetch alternatives summary: ${res.status}`);
	return res.json() as Promise<AlternativeSummary>;
}
