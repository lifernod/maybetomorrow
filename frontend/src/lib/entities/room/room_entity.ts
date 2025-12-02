import type { DayEntity } from '../day/day_entity';
import type { UserEntity } from '../user/user_entity';
import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';

export type RoomEntity = {
	roomId: string;
	dayNumber: DayEntity["dayNumber"][];
	monthNumber: DayEntity["monthNumber"][];
	ownerUsername: UserEntity["username"];
	username: UserEntity["username"][]; // users
};

export type ResponseRoomEntity = CamelKeysToSnake<RoomEntity>;

export class RoomConverter extends Converter<'room'> {

	public convertSingleFromResponse(r: ResponseRoomEntity): RoomEntity {
		return {
			roomId: r.room_id,
			dayNumber: r.day_number,
			monthNumber: r.month_number,
			ownerUsername: r.owner_username,
			username: r.username
		};
	}

	public convertSingleToRequest(entity: RoomEntity): ResponseRoomEntity {
		return {
			room_id: entity.roomId,
			day_number: entity.dayNumber,
			month_number: entity.monthNumber,
			owner_username: entity.ownerUsername,
			username: entity.username
		};
	}
}