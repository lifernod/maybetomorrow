import { User } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const userId = cookies.get("userId");
  if (!userId) {
    error(401, "Вы не вошли в аккаунт!");
  }

  return {
    month: await User.getCurrentMonth(userId),
  };
};
