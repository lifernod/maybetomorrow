import type { DayEntity } from './day';
import type { UserEntity } from './user';
import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';

export type RoomEntityType = {
	roomId: string;
	dayNumber: DayEntity["dayNumber"][];
	monthNumber: DayEntity["monthNumber"][];
	ownerUsername: UserEntity["username"];
	username: UserEntity["username"][]; // users
};

export type ResponseRoomEntity = CamelKeysToSnake<RoomEntityType>;

export class RoomEntity {
	public roomId: string;
	public dayNumber: DayEntity["dayNumber"][];
	public monthNumber: DayEntity["monthNumber"][];
	public ownerUsername: UserEntity["username"];
	public username: UserEntity["username"][];

	constructor(obj: RoomEntityType) {
		this.roomId = obj.roomId;
		this.dayNumber = obj.dayNumber;
		this.monthNumber = obj.monthNumber;
		this.ownerUsername = obj.ownerUsername;
		this.username = obj.username;
	}
}

export class RoomConverter extends Converter<'room'> {

	public convertSingleFromResponse(r: ResponseRoomEntity): RoomEntity {
		return new RoomEntity({
			roomId: r.room_id,
			dayNumber: r.day_number,
			monthNumber: r.month_number,
			ownerUsername: r.owner_username,
			username: r.username
		});
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


	public serialize(entity: RoomEntity): RoomEntityType {
		return { ...entity };
	}

	public deserialize(obj: RoomEntityType): RoomEntity {
		return new RoomEntity(obj);
	}
}