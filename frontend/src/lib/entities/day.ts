import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { getEnumKeyByValue } from '$lib/typeUtils/enumKV';
import { Converter } from '$lib/typeUtils/convert';
import type { EntityOf, ObjectOf } from '$lib/typeUtils/typesList';

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

export type DayEntityType = {
	dayId: number;
	dayNumber: number;
	monthNumber: number;
	dayType: DayType;
	events: number[];
};

export type ResponseDayEntity = CamelKeysToSnake<
	Omit<DayEntityType, 'dayType'> & { dayType: string }
>;


export class DayEntity {
	public dayId: number;
	public dayNumber: number;
	public monthNumber: number;
	public dayType: DayType;
	public events: number[];

	constructor(obj: DayEntityType) {
		this.dayId = obj.dayId;
		this.dayNumber = obj.dayNumber;
		this.monthNumber = obj.monthNumber;
		this.dayType = obj.dayType;     // ✔ исправлено!
		this.events = obj.events;
	}
}

export class DayConverter extends Converter<'day'> {
	public convertSingleFromResponse(response: ResponseDayEntity): DayEntity {
		return new DayEntity({
			dayId: response.day_id,
			dayNumber: response.day_number,
			monthNumber: response.month_number,
			dayType: getDayTypeFromString(response.day_type),
			events: response.events
		});
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

	public serialize(entity: DayEntity): DayEntityType {
		return { ...entity };
	}

	public deserialize(obj: DayEntityType): DayEntity {
		return new DayEntity(obj);
	}
}