import { createApiUrl } from "$lib/utils/url";
import { Event } from "./event";
import { Month } from "./month";

export enum DayType {
  Free = "free",
  Busy = "busy",
  Undefined = "undefined",
  Uneditable = "uneditable",
}

export class Day {
  private static readonly DEFAULT_DAY_ID = -1;

  public readonly day_id: number;
  public readonly day_number: number;
  public readonly month_number: number;
  public day_type: DayType;
  public events: Event["event_id"][];

  constructor(
    day_number: number,
    month_number: number,
    day_type: DayType = DayType.Undefined,
    day_id?: number,
    events?: Event["event_id"][] | null
  ) {
    this.day_id = day_id ?? Day.DEFAULT_DAY_ID;
    this.day_number = day_number;
    this.month_number = month_number;
    this.day_type = day_type;
    this.events = events === null || events === undefined ? [] : [];
  }

  public static readonly weekDays = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс",
  ] as const;

  public static getDayInfo(day: Day): string {
    const monthInfo = Month.getMonthInfo(day.month_number);
    return `${day.day_number} ${monthInfo.monthName.not} ${monthInfo.year}`;
  }

  public static async getDayById(): Promise<Day> {
    const response = await fetch(createApiUrl("/api/day/getById"), {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  }

  public static async createDay(day: Day): Promise<Day> {
    const response = await fetch(createApiUrl("/api/day/create"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(day),
      credentials: "include",
    });

    return (await response.json()) as Day;
  }

  public static async getEvents(dayId: Day["day_id"]): Promise<Event[]> {
    if (dayId === this.DEFAULT_DAY_ID) {
      return [];
    }

    const response = await fetch(
      createApiUrl(`/api/day/getEventsById/${dayId}`),
      {
        method: "GET",
        credentials: "include",
      }
    );

    const json = (await response.json()) as { events: Event[] };
    return json.events;
  }

  public static async linkEventsToDay(
    dayId: Day["day_id"],
    eventIds: Event["event_id"][]
  ): Promise<Error | undefined> {
    const response = await fetch(createApiUrl("/api/day/linkEventsToDay"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day_id: dayId, event_ids: eventIds }),
      credentials: "include",
    });

    if (!response.ok) {
      return new Error(response.statusText);
    }
  }
}
