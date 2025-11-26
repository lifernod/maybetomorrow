import { User } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  // const username = cookies.get("username");
  // if (!username) {
  //   error(401, "Вы не вошли в аккаунт!");
  // }
  return {
    month: await User.getCurrentMonth(),
  };
};
