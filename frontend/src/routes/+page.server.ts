import { User } from "$lib/types";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions = {
  login: async ({ request, cookies, locals }) => {
    const form = await request.formData();

    const userId = (form.get("userId") ?? "") as string;
    const user = await User.getUser(userId);

    if (user) {
      cookies.set("userId", userId, {
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      });
      locals.user = user;
    }

    redirect(303, "/home");
  },
} satisfies Actions;
