import type { MonthEntity } from '$lib/entities/month/month_entity';

const months = [
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

export type MonthInfo = {
	monthName: {
		long: string;
		short: string;
		not: string;
	};
	year: number;
};

export function getMonthInfo(monthNumber: MonthEntity["monthNumber"]): MonthInfo {
	if (monthNumber % 12 === 0) {
		return {
			monthName: months[monthNumber - 1],
			year: 2025,
		};
	} else {
		return {
			monthName: months[(monthNumber % 12) - 1],
			year: 2025 + Math.floor(monthNumber / 12),
		};
	}
}
