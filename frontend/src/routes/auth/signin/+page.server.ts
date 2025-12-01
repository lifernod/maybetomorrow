import { type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		
		const username = form.get("username") as string;
		const password = form.get("password") as string;
		
		const usernameCookie = cookies.serialize("username", username, {
			sameSite: "lax",
			httpOnly: true,
			secure: true,
			path: "/home"
		});

		const passwordCookie = cookies.serialize("password_hash", password, {
			sameSite: "lax",
			httpOnly: true,
			secure: true,
			path: "/home"
		});
		
		const headers = new Headers({
			"Set-Cookie": [usernameCookie, passwordCookie].join(",")
		});
		
		// TODO: api call
		
		redirect(308, "/home");
	}
}