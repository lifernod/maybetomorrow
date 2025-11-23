import { error, redirect, type Actions } from "@sveltejs/kit";
import bcrypt from "bcryptjs";

export const actions = {
  login: async ({ request, cookies, locals }) => {
    // const form = await request.formData();

    // const username = (form.get("username") ?? "") as string;
    // const password = (form.get("password") ?? "") as string;

    // TODO: api call

    // if (user) {
    //   cookies.set("userId", userId, {
    //     sameSite: "lax",
    //     httpOnly: true,
    //     path: "/",
    //   });
    //   locals.user = user;
    // }

    redirect(303, "/home");
  },
  signup: async ({ request, cookies }) => {
    // const form = await request.formData();

    // const username = (form.get("username") ?? "") as string;
    // const password = (form.get("password") ?? "") as string;
    // const spassword = (form.get("spassword") ?? "") as string;

    // if (password != spassword) {
    //   error(400, "Пароли должны совпадать!");
    // }

    // const passwordHash = await bcrypt.hash(password, 5);

    // const response = await fetch("http://localhost:4000/api/user/create", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username,
    //     password_hash: passwordHash,
    //   }),
    // });

    // if (response.ok) {
    //   cookies.set("username", username, {
    //     sameSite: "lax",
    //     httpOnly: true,
    //     path: "/",
    //   });
    redirect(301, "/home");
    // } else {
    //   error(401, "a?");
    // }
  },
} satisfies Actions;
