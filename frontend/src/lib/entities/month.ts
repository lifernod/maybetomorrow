import { DayConverter, type DayEntity, type ResponseDayEntity } from './day';
import { Converter } from '$lib/typeUtils/convert';

export type MonthEntityType = {
	days: DayEntity[][];
	monthNumber: number;
}

export type ResponseMonthEntity = {
	days: ResponseDayEntity[][];
	month_number: number;
}

export class MonthEntity {
	public days: DayEntity[][];
	public monthNumber: number;

	constructor(obj: MonthEntityType) {
		this.days = obj.days;
		this.monthNumber = obj.monthNumber;
	}
}

export class MonthConverter extends Converter<'month'> {
	private readonly dayConverter: DayConverter;

	constructor(dayConverter: DayConverter) {
		super();

		this.dayConverter = dayConverter;
	}

	public convertSingleFromResponse(r: ResponseMonthEntity): MonthEntity {
		return new MonthEntity({
			days: r.days.map(week => this.dayConverter.convertListFromResponse(week)),
			monthNumber: r.month_number
		});
	}

	public convertSingleToRequest(entity: MonthEntity): ResponseMonthEntity {
		return {
			days: entity.days.map(week => this.dayConverter.convertListToRequest(week)),
			month_number: entity.monthNumber
		};
	}


	public serialize(entity: MonthEntity): MonthEntityType {
		return {
			...entity,
			days: entity.days.map(week => this.dayConverter.serializeList(week)), };
	}

	public deserialize(obj: MonthEntityType): MonthEntity {
		return new MonthEntity({
			monthNumber: obj.monthNumber,
			days: obj.days.map(week => this.dayConverter.deserializeList(week)),
		});
	}
}