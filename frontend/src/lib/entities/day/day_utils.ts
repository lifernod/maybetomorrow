import type { DayEntity } from '$lib/entities/day/day_entity';
import { getMonthInfo } from '$lib/entities/month/month_info';

export function getEventsCountString(events: number): string {
	const count = events;
	let suffix = "";

	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		suffix = "ий";
	} else {
		switch (lastDigit) {
			case 1:
				suffix = "ие";
				break;
			case 2:
			case 3:
			case 4:
				suffix = "ия";
				break;
			default:
				suffix = "ий";
				break;
		}
	}

	return `${count} событ${suffix}`;
}

export function getDayInfo(day: DayEntity): string {
	const monthInfo = getMonthInfo(day.monthNumber);
	return `${day.dayNumber} ${monthInfo.monthName.not} ${monthInfo.year}`;
}