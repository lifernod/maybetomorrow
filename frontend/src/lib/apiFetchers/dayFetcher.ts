import { DayConverter, type DayEntity, type ResponseDayEntity } from '$lib/entities/day';

import { BaseFetcher } from '$lib/apiFetchers/baseFetcher';
import type { Fetcher } from '$lib/api';

export class DayFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	public async getEventsById(id: DayEntity["dayId"]) {
		return await this.sendRequest('day', {
			endpoint: `/day/getEventsById/${id}`,
			method: 'GET',
			includeCredentials: true,
		});
	}

	public async create(day: DayEntity){
		return await this.sendRequest('day', {
			endpoint: '/day/create',
			method: 'POST',
			includeCredentials: true,
			body: day,
		});
	}
}