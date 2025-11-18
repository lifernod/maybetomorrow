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
    events?: Event["event_id"][]
  ) {
    this.day_id = day_id ?? Day.DEFAULT_DAY_ID;
    this.day_number = day_number;
    this.month_number = month_number;
    this.day_type = day_type;
    this.events = events ?? [];
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

  public getDayInfo(): string {
    const monthInfo = Month.getMonthInfo(this.month_number);
    return `${this.day_number} ${monthInfo.monthName.not} ${monthInfo.year}`;
  }

  public static async getEvents(dayId: Day["day_id"]): Promise<Event[]> {
    return [];
  }
}
