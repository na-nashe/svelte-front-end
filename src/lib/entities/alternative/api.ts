import type { AlternativeSummary } from './types';

export async function fetchAlternativesSummary(): Promise<AlternativeSummary> {
	const res = await fetch(`/api/alternatives/summary`);
	if (!res.ok) throw new Error(`Failed to fetch alternatives summary: ${res.status}`);
	return res.json() as Promise<AlternativeSummary>;
}
