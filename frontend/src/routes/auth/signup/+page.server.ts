import { type Actions, fail, redirect } from '@sveltejs/kit';
import { ApiFetcher } from '$lib/fetchers/api_fetcher';
import { hash } from 'bcryptjs';

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const form = await request.formData();

		const username = form.get("username") as string;
		const password = form.get("password") as string;

		const passwordHash = await hash(password, 5);

		cookies.set("username", username, {
			sameSite: "lax",
			httpOnly: true,
			secure: true,
			path: "/"
		});

		cookies.set("password_hash", password, {
			sameSite: "lax",
			httpOnly: true,
			secure: true,
			path: "/"
		});

		const result =
			await ApiFetcher
				.fetcher(fetch)
				.user()
				.createUser({ username, passwordHash });

		if (result.isOk() && result.getValue()!) {
			redirect(307, "/home");
		} else {
			const err = result.getError();
			fail(err!.status, err!.message);
		}
	}
}