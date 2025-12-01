import { EventEntity, type EventEntityType, type ResponseEventEntity } from '$lib/entities/event';
import { DayEntity, type DayEntityType, type ResponseDayEntity } from '$lib/entities/day';
import  { MonthEntity, type ResponseMonthEntity } from '$lib/entities/month';
import { type ResponseRoomEntity, RoomEntity, type RoomEntityType } from '$lib/entities/room';
import { type ResponseUserEntity, UserEntity, type UserEntityType } from '$lib/entities/user';

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

export interface EntityObjects {
	event: EventEntityType;
	day: DayEntityType;
	month: MonthEntity;
	room: RoomEntityType;
	user: UserEntityType;
}

export type Keys = keyof Entities;
export type ResponseOf<K extends Keys> = Responses[K];
export type EntityOf<K extends Keys> = Entities[K];
export type ObjectOf<K extends Keys> = Entities[K];
