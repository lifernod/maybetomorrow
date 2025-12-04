import { Month } from "./month";
import { Day } from "./day";
import { createApiUrl } from "$lib/utils/url";

export class User {
  public readonly user_id: string; // UUID
  public username: string;
  public password_hash: string; // HASH

  constructor(user_id: string, username: string, password_hash: string) {
    this.user_id = user_id;
    this.username = username;
    this.password_hash = password_hash;
  }

  public static async getCurrentMonth(): Promise<Month> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const response = await fetch(
      createApiUrl("/api/user/getCurrentMonth"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year_number: year,
          month_number: month,
        }),
        credentials: "include",
      }
    );

    const json = (await response.json()) as {
      days: Day[][];
      month_number: number;
    };
    return new Month(json.month_number, json.days);
  }

  // Добавляем метод для получения текущего пользователя
  public static getCurrentUser(): string | null {
    // В реальном приложении это должно получаться из куки или контекста
    // Пока возвращаем mock значение
    return "current_user";
  }

  // Добавляем метод для создания пользователя через API
  public static async createUser(username: string, password: string): Promise<void> {
    const response = await fetch(
      createApiUrl("/api/user/create"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password_hash: password, // На фронтенде хэширование не делаем
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка создания пользователя");
    }
  }

  // Добавляем метод для проверки пользователя
  public static async validateUser(username: string, password: string): Promise<boolean> {
    const response = await fetch(
      createApiUrl("/api/user/checkUser"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return response.ok;
  }
}