import  { error, type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ApiFetcher } from '$lib/fetchers/api_fetcher';

const PROTECTED = [
	'/home'
];

const authMiddleware: Handle = async ({ event, resolve }) => {

	if (event.route.id && !PROTECTED.includes(event.route.id)) {
		return await resolve(event);
	}

	const usernameCookie = event.cookies.get("username");
	const passwordCookie = event.cookies.get("password_hash");

	if (usernameCookie === undefined || passwordCookie === undefined) {

		redirect(308, "/auth/signin");
	}

	const result =
		await ApiFetcher
			.fetcher(event.fetch)
			.user()
			.checkUser();

	if (result.isError()) {
		error(500,  "a?");
	}
	return await resolve(event);
}

export const handle = sequence(authMiddleware);