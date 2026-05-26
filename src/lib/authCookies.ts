import { env } from '$env/dynamic/private';

// `Secure` cookies are only stored by browsers over HTTPS (localhost excepted).
// Defaults to true; set COOKIE_SECURE=false to allow auth over plain HTTP.
const secure = env.COOKIE_SECURE !== 'false';

const base = {
	httpOnly: true,
	secure,
	sameSite: 'strict',
	path: '/'
} as const;

export const accessTokenCookie = { ...base, maxAge: 60 * 15 };
export const refreshTokenCookie = { ...base, maxAge: 60 * 60 * 24 * 30 };
