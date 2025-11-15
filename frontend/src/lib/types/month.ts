import { Day, DayType } from "./day";

export type MonthInfo = {
  monthName: {
    long: string;
    short: string;
    not: string;
  };
  year: number;
};

export class Month {
  public readonly monthInfo: MonthInfo;
  public days: Day[][];

  constructor(month_number: number, days: Day[][]) {
    this.monthInfo = Month.getMonthInfo(month_number);
    this.days = days;
  }

  public static readonly months = [
    { long: "Январь", short: "Янв", not: "января" },
    { long: "Февраль", short: "Фев", not: "февраля" },
    { long: "Март", short: "Март", not: "марта" },
    { long: "Апрель", short: "Апр", not: "апреля" },
    { long: "Май", short: "Май", not: "мая" },
    { long: "Июнь", short: "Июнь", not: "июня" },
    { long: "Июль", short: "Июль", not: "июля" },
    { long: "Август", short: "Авг", not: "августа" },
    { long: "Сентябрь", short: "Сент", not: "сентября" },
    { long: "Октябрь", short: "Окт", not: "октября" },
    { long: "Ноябрь", short: "Нояб", not: "ноября" },
    { long: "Декабрь", short: "Дек", not: "декабря" },
  ] as const;

  public static getMonthInfo(month_number: number): MonthInfo {
    if (month_number % 12 === 0) {
      return {
        monthName: Month.months[month_number - 1],
        year: 2025,
      };
    } else {
      return {
        monthName: Month.months[(month_number % 12) - 1],
        year: 2025 + Math.floor(month_number / 12),
      };
    }
  }

  public static async getCurrentMonth(): Promise<Month> {
    const month: Day[][] = [];

    let week: Day[] = [
      new Day(27, 10, DayType.Uneditable, 1),
      new Day(28, 10, DayType.Uneditable, 2),
      new Day(29, 10, DayType.Uneditable, 3),
      new Day(30, 10, DayType.Uneditable, 4),
      new Day(1, 11, DayType.Free, 5),
      new Day(2, 11, DayType.Free, 6),
      new Day(3, 11, DayType.Free, 7),
    ];

    month.push(week);
    week = [];

    let nextDayNumber = 4;
    let nextDayId = 8;

    for (let j = 1; j < 6; j++) {
      for (let i = 1; i < 8; i++) {
        if (week.length == 7) {
          month.push(week);
          week = [];
        } else {
          const b = Math.floor(Math.random() * (1 - 0 + 1)) + 0 === 1;
          week.push(
            new Day(
              nextDayNumber,
              11,
              b ? DayType.Busy : DayType.Undefined,
              nextDayId,
              b
                ? Array.from(
                    { length: Math.floor(Math.random() * 10) + 1 },
                    () => Math.floor(Math.random() * 100) + 1
                  )
                : undefined
            )
          );
          nextDayId++;
          nextDayNumber++;
        }
      }
    }

    return new Month(11, month);
  }

  // public static async getCurrentWeek(
  //   dayIds: Day["day_id"][]
  // ): Promise<Event[][]> {
  //   const allEvents: Event[][] = [];
  //   for (const id of dayIds) {
  //     const events = await Day.getEvents(id);
  //     allEvents.push(events);
  //   }

  //   return allEvents;
  // }
}
