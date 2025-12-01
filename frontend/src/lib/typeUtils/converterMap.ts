import type { Converter } from '$lib/typeUtils/convert';
import type { Keys } from '$lib/typeUtils/typesList';
import { EventConverter } from '$lib/entities/event';
import { DayConverter } from '$lib/entities/day';
import { MonthConverter } from '$lib/entities/month';
import { RoomConverter } from '$lib/entities/room';
import { UserConverter } from '$lib/entities/user';

export type ConverterMap = {
	[K in Keys]: Converter<K>;
}

function createConverterMap(): ConverterMap {
	const event = new EventConverter();
	const day = new DayConverter();
	const month = new MonthConverter(day);
	const room = new RoomConverter();
	const user = new UserConverter();

	return {
		event,
		day,
		month,
		room,
		user
	}
}

export const converterMap = createConverterMap();