export function decodeJwtSub(token: string): string | null {
	try {
		return JSON.parse(atob(token.split('.')[1])).sub ?? null;
	} catch {
		return null;
	}
}
