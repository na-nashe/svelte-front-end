import type { AlternativeSummary } from './types';

export async function fetchAlternativesSummary(
	fetch: typeof globalThis.fetch,
	apiBase: string
): Promise<AlternativeSummary> {
	const res = await fetch(`${apiBase}/alternatives/summary`);
	if (!res.ok) throw new Error(`Failed to fetch alternatives summary: ${res.status}`);
	return res.json() as Promise<AlternativeSummary>;
}
