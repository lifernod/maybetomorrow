import {Day, DayType, Month} from "../types";

export const DAYS = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс"
] as const;
export function getDayName(day_number: Day["day_number"]): string {
    return DAYS[day_number - 1];
}

export const MONTHS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
] as const;
export function getMonthName(month_number: Month["month_number"]): string {
    return MONTHS[month_number - 1];
}

export const DAY_TYPES = [
    { day_type: DayType.Undefined, name: "Не определено", color: "bg-table-undefined" },
    { day_type: DayType.Free, name: "Свободно", color: "bg-table-free" },
    { day_type: DayType.Busy, name: "Занято", color: "bg-table-busy" },
] as const;