import { type EventEntity, type ResponseEventEntity } from '$lib/entities/event/event_entity';
import { type DayEntity, type ResponseDayEntity } from '$lib/entities/day/day_entity';
import  { type MonthEntity, type ResponseMonthEntity } from '$lib/entities/month/month_entity';
import { type ResponseRoomEntity, type RoomEntity } from '$lib/entities/room/room_entity';
import { type ResponseUserEntity, type UserEntity } from '$lib/entities/user/user_entity';

export interface Responses {
	event: ResponseEventEntity;
	day: ResponseDayEntity;
	month: ResponseMonthEntity;
	room: ResponseRoomEntity;
	user: ResponseUserEntity;
}

export interface Entities {
	event: EventEntity;
	day: DayEntity;
	month: MonthEntity;
	room: RoomEntity;
	user: UserEntity;
}

export type Keys = keyof Entities;

export type ResponseOf<K extends Keys> = Responses[K];
export type EntityOf<K extends Keys> = Entities[K];

export type MaybeListResponseOf<K extends Keys> = ResponseOf<K> | Array<ResponseOf<K>>;
export type MaybeListEntityOf<K extends Keys> = EntityOf<K> | Array<EntityOf<K>>;