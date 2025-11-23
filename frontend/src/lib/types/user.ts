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
      createApiUrl("/api/user/getCurrentMonthById"),
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
}
