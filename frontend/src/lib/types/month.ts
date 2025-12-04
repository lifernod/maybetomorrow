import { Day } from "./day";

export type MonthInfo = {
  monthName: {
    long: string;
    short: string;
    not: string;
  };
  year: number;
  monthNumber: number;
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
    let monthIndex: number;
    let year: number;
    
    if (month_number % 12 === 0) {
      monthIndex = 11; // Декабрь (12 % 12 = 0, но нам нужен индекс 11)
      year = 2025 + Math.floor((month_number - 1) / 12);
    } else {
      monthIndex = (month_number % 12) - 1;
      year = 2025 + Math.floor(month_number / 12);
    }
    
    return {
      monthName: Month.months[monthIndex],
      year: year,
      monthNumber: month_number // Добавляем номер месяца
    };
  }
}