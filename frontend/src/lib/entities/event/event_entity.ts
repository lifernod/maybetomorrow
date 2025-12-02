import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';
import { formatDate } from '$lib/api';

export type EventEntity = {
	eventId: number;
	eventName: string;
	eventDescription?: string;
	startTime: Date;
	endTime?: Date;
};

export type ResponseEventEntity = CamelKeysToSnake<
	Omit<EventEntity, 'startTime' | 'endTime'> & { eventStart: string, eventEnd?: string }
>;

export class EventConverter extends Converter<'event'> {
	public convertSingleFromResponse(r: ResponseEventEntity): EventEntity {
		return {
			eventId: r.event_id,
			eventName: r.event_name,
			eventDescription: r.event_description,
			startTime: new Date(r.event_start),
			endTime: r.event_end ? new Date(r.event_end) : undefined
		};
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

}