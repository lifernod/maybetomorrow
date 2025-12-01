import { BaseFetcher } from '$lib/apiFetchers/baseFetcher';
import { type Fetcher } from '$lib/api';
import type { ResponseMonthEntity } from '$lib/entities/month';
import { converterMap } from '$lib/typeUtils/converterMap';

export class MonthFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	public async getCurrentMonth() {
		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();

		const result = await this.rawFetch<ResponseMonthEntity>({
			endpoint: "/user/getCurrentMonth",
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				month_number: currentMonth,
				year_number: currentYear
			})
		});

		return result.map(it => converterMap['month'].convertSingleFromResponse(it));
	}
}