import { Month, User } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    //const userId = cookies.get("userId");
    //if (!userId) {
      //  redirect(303, "/"); // Перенаправляем на страницу входа если не авторизован
    //}
    
    // Для демонстрации используем текущий месяц
    // В реальном приложении нужно передавать userId в метод
    return {
        month: await User.getCurrentMonth()
    }
}