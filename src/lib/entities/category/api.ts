import type { Category } from './types';

export async function fetchCategories(fetch: typeof globalThis.fetch): Promise<Category[]> {
	const res = await fetch('/api/categories');
	if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
	return res.json() as Promise<Category[]>;
}
