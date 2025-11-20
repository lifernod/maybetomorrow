import * as bcrypt from "bcrypt";
import { Month } from "./month";
import { Day } from "./day";

export class User {
  public readonly user_id: string; // UUID

  public username: string;
  public password_t: string; // HASH

  constructor(
    user_id: string,
    username: string,
    password_t: string,
    needToHash = true,
  ) {
    this.user_id = user_id;
    this.username = username;
    if (needToHash) {
      this.password_t = bcrypt.hashSync(password_t, 10);
    } else {
      this.password_t = password_t;
    }
  }

  public static async getUser(userId: User["user_id"]): Promise<User> {
    const response = await fetch("/api/user/getById", {
      method: "GET",
    });

    return await response.json();
  }

  public static async getCurrentMonth(userId: User["user_id"]): Promise<Month> {
    const response = await fetch("/api/user/getCurrentMonthById", {
      method: "GET",
    });

    const json = (await response.json()) as {
      days: Day[][];
      month_number: number;
    };
    return new Month(json.month_number, json.days);
  }
}
