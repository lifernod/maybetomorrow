import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { getEnumKeyByValue } from '$lib/typeUtils/enumKV';
import { Converter } from '$lib/typeUtils/convert';

export enum DayType {
	Free = "free",
	Busy = "busy",
	Undefined = "undefined",
	Uneditable = "uneditable",
}

export function getDayTypeFromString(value: string): DayType {
	const key = getEnumKeyByValue(DayType, value);
	return DayType[key ?? "Free"];
}

export type DayEntity = {
	dayId: number;
	dayNumber: number;
	monthNumber: number;
	dayType: DayType;
	events: number[];
};

export type ResponseDayEntity = CamelKeysToSnake<
	Omit<DayEntity, 'dayType'> & { dayType: string }
>;

export class DayConverter extends Converter<'day'> {
	public convertSingleFromResponse(response: ResponseDayEntity): DayEntity {
		return {
			dayId: response.day_id,
			dayNumber: response.day_number,
			monthNumber: response.month_number,
			dayType: getDayTypeFromString(response.day_type),
			events: response.events
		};
	}

	public convertSingleToRequest(entity: DayEntity): ResponseDayEntity {
		return {
			day_id: entity.dayId,
			day_number: entity.dayNumber,
			month_number: entity.monthNumber,
			day_type: entity.dayType.valueOf(),
			events: entity.events
		};
	}
}