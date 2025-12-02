import type { Converter } from '$lib/typeUtils/convert';
import type { Keys } from '$lib/typeUtils/typesList';
import { EventConverter } from '$lib/entities/event/event_entity';
import { DayConverter } from '$lib/entities/day/day_entity';
import { MonthConverter } from '$lib/entities/month/month_entity';
import { RoomConverter } from '$lib/entities/room/room_entity';
import { UserConverter } from '$lib/entities/user/user_entity';

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