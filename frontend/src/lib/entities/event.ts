import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';
import { formatDate } from '$lib/api';

export type EventEntityType = {
	eventId: number;
	eventName: string;
	eventDescription?: string;
	startTime: Date;
	endTime?: Date;
};

export type ResponseEventEntity = CamelKeysToSnake<
	Omit<EventEntityType, 'startTime' | 'endTime'> & { eventStart: string, eventEnd?: string }
>;


export class EventEntity {
	public eventId: number;
	public eventName: string;
	public eventDescription?: string;
	public startTime: Date;
	public endTime?: Date;

	constructor(obj: EventEntityType) {
		this.eventId = obj.eventId;
		this.eventName = obj.eventName;
		this.eventDescription = obj.eventDescription;
		this.startTime = obj.startTime;
		this.endTime = obj.endTime;
	}
}

export class EventConverter extends Converter<'event'> {
	public convertSingleFromResponse(r: ResponseEventEntity): EventEntity {
		return new EventEntity({
			eventId: r.event_id,
			eventName: r.event_name,
			eventDescription: r.event_description,
			startTime: new Date(r.event_start),
			endTime: r.event_end ? new Date(r.event_end) : undefined
		});
	}

	public convertSingleToRequest(entity: EventEntity): ResponseEventEntity {
		return {
			event_id: entity.eventId,
			event_name: entity.eventName,
			event_description: entity.eventDescription,
			event_start: formatDate(entity.startTime)!,
			event_end: formatDate(entity.endTime)
		};
	}


	public serialize(entity: EventEntity): EventEntityType {
		return { ...entity };
	}

	public deserialize(obj: EventEntityType): EventEntity {
		return new EventEntity(obj);
	}
}