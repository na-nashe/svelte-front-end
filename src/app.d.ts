// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Category } from '$lib/entities/category/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			token: string | null;
			isAuthenticated: boolean;
		}
		interface PageData {
			categories?: Category[];
			alternativesTotal?: number;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
