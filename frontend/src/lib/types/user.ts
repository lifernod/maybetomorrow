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
    needToHash = true
  ) {
    this.user_id = user_id;
    this.username = username;
    // if (needToHash) {
    //   bcrypt.hash(password_t, 10).then((p) => (this.password_t = p));
    // } else {
    //   this.password_t = password_t;
    // }
    this.password_t = password_t;
  }

  public static async getUser(userId: User["user_id"]): Promise<User> {
    const response = await fetch("http://localhost:4000/api/user/getById", {
      method: "GET",
    });

    return await response.json();
  }

  public static async getCurrentMonth(userId: User["user_id"]): Promise<Month> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const response = await fetch(
      "http://localhost:4000/api/user/getCurrentMonthById",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year_number: year,
          month_number: month,
        }),
      }
    );

    const json = (await response.json()) as {
      days: Day[][];
      month_number: number;
    };
    return new Month(json.month_number, json.days);
  }
}
