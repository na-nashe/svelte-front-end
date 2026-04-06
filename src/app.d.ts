// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Category } from '$lib/entities/category/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			categories?: Category[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
