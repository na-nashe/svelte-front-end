export function faviconUrl(url?: string | null): string | null {
	console.log('asshole', url);
	if (!url) return null;
	try {
		const { origin } = new URL(url);
		const output = `${origin}/favicon.ico`;
		console.log(output);
		return output;
	} catch {
		return null;
	}
}
