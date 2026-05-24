interface Bucket {
	count: number;
	resetAt: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
	key: string,
	{ limit = 5, windowMs = 60 * 60 * 1000 } = {}
): { allowed: boolean; remaining: number } {
	const now = Date.now();
	const bucket = buckets.get(key);

	if (!bucket || now > bucket.resetAt) {
		buckets.set(key, { count: 1, resetAt: now + windowMs });
		return { allowed: true, remaining: limit - 1 };
	}

	if (bucket.count >= limit) {
		return { allowed: false, remaining: 0 };
	}

	bucket.count++;
	return { allowed: true, remaining: limit - bucket.count };
}
