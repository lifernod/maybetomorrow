import { type Fetcher } from '$lib/api';
import { type EventEntity } from '$lib/entities/event/event_entity';
import { BaseFetcher } from '$lib/fetchers/base_fetcher';

export class EventFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	public async getById(id: EventEntity["eventId"]) {
		return await this.sendRequestSingle('event', {
			endpoint: `/event/getById/${id}`,
			method: 'GET',
			includeCredentials: true,
		});
	}

	public async create(event: EventEntity[]) {
		return await this.sendRequestSingle('event', {
			endpoint: '/event/create',
			method: 'POST',
			includeCredentials: true,
			body: event,
		});
	}

	public async update(event: EventEntity) {
		return await this.sendRequestSingle('event', {
			endpoint: '/event/update',
			method: 'PUT',
			includeCredentials: true,
			body: event,
		});
	}
}