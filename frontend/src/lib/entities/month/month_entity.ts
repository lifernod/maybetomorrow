import { DayConverter, type DayEntity, type ResponseDayEntity } from '../day/day_entity';
import { Converter } from '$lib/typeUtils/convert';

export type MonthEntity = {
	days: DayEntity[][];
	monthNumber: number;
}

export type ResponseMonthEntity = {
	days: ResponseDayEntity[][];
	month_number: number;
}

export class MonthConverter extends Converter<'month'> {
	private readonly dayConverter: DayConverter;

	constructor(dayConverter: DayConverter) {
		super();

		this.dayConverter = dayConverter;
	}

	public convertSingleFromResponse(r: ResponseMonthEntity): MonthEntity {
		return {
			days: r.days.map(week => this.dayConverter.convertListFromResponse(week)),
			monthNumber: r.month_number
		};
	}

	public convertSingleToRequest(entity: MonthEntity): ResponseMonthEntity {
		return {
			days: entity.days.map(week => this.dayConverter.convertListToRequest(week)),
			month_number: entity.monthNumber
		};
	}
}