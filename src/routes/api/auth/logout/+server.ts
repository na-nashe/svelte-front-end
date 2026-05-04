import { json, type RequestEvent } from '@sveltejs/kit';

export async function POST({ cookies }: RequestEvent) {
	cookies.delete('token', { path: '/' });
	return json({ ok: true });
}