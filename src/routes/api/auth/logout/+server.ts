import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ cookies }: RequestEvent) {
	cookies.delete('access_token', { path: '/' });
	return json({ ok: true });
}