import type { DayEntity } from '$lib/entities/day/day_entity';

import { BaseFetcher } from '$lib/fetchers/base_fetcher';
import type { Fetcher } from '$lib/api';
import { FetcherResult } from '$lib/fetchers/fetcher_result';

export class DayFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	public async getEventsById(id: DayEntity["dayId"]) {
		if (id === -1) {
			return FetcherResult.ok([]);
		}

		return await this.sendRequestList('event', {
			endpoint: `/day/getEventsById/${id}`,
			method: 'GET',
			includeCredentials: true,
		});
	}

	public async create(day: DayEntity){
		return await this.sendRequestSingle('day', {
			endpoint: '/day/create',
			method: 'POST',
			includeCredentials: true,
			body: day,
		});
	}
}