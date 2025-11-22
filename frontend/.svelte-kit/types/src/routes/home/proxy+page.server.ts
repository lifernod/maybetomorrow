// @ts-nocheck
import { Month, User } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
    const userId = cookies.get("userId");
    if (!userId) {
        error(401, "Вы не вошли в аккаунт!");
    }
    
    return {
        month: await User.getCurrentMonth(userId)
    }
}