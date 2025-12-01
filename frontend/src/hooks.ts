import type { Transport } from '@sveltejs/kit';
import { converterMap } from '$lib/typeUtils/converterMap';
import { EventEntity } from '$lib/entities/event';
import { DayEntity } from '$lib/entities/day';
import { MonthEntity } from '$lib/entities/month';
import { RoomEntity } from '$lib/entities/room';
import { UserEntity } from '$lib/entities/user';

export const transport: Transport = {
	EventEntity: {
		encode: value => value instanceof EventEntity && converterMap['event'].serialize(value),
		decode: converterMap['event'].deserialize
	},
	DayEntity: {
		encode: value => value instanceof DayEntity && converterMap['day'].serialize(value),
		decode: converterMap['day'].deserialize
	},
	MonthEntity: {
		encode: value => value instanceof MonthEntity && converterMap['month'].serialize(value),
		decode: converterMap['month'].deserialize
	},
	RoomEntity: {
		encode: value => value instanceof RoomEntity && converterMap['room'].serialize(value),
		decode: converterMap['room'].deserialize
	},
	UserEntity: {
		encode: value => value instanceof UserEntity && converterMap['user'].serialize(value),
		decode: converterMap['user'].deserialize
	}
}