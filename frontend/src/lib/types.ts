export type Event = {
    event_id: number,
    event_name: string,
    event_description?: string,
};

export enum DayType {
    Undefined,
    Free,
    Busy,
    Uneditable
}

export type Day = {
    day_id: number,
    day_number: number,
    day_type: DayType,
    events: Event["event_id"][],
};

export type Month = {
    month_id: number,
    month_number: number,
    month_year: number,
    days: Day[][],
}

export type User = {
    user_id: string,
    username: string,
    months: Month[]
}

export async function getExampleMonth(): Promise<Month> {
    const weeks: Day[][] = [];
    let days: Day[] = [];
    let a = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
            days.push({ day_id: a, day_number: i, day_type: DayType.Undefined, events: a % 3 == 0 ? Array(Math.floor(Math.random() * (10 - 0) + 0)) : [] });
            a++;
        }
        weeks.push(days);
        days = [];
    }

    return { month_id: 7, month_number: 11, month_year: 2025, days: weeks };
}