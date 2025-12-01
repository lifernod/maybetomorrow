import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const PROTECTED = ["/home"] as const;

const authMiddleware: Handle = async ({ event, resolve }) => {
	// if (PROTECTED.find((it) => event.url.pathname === it)) {
	// 	redirect(308, "/home");
	// }

	return await resolve(event);
};

export const handle = sequence(authMiddleware);
