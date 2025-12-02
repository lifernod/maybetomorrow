import { BaseFetcher } from '$lib/fetchers/base_fetcher';
import { type Fetcher } from '$lib/api';
import type { ResponseMonthEntity } from '$lib/entities/month/month_entity';
import { converterMap } from '$lib/typeUtils/converterMap';
import { FetcherResult } from '$lib/fetchers/fetcher_result';

export class MonthFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	public async getCurrentMonth() {
		const now = new Date();
		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();


		const result = await this.rawFetch({
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

		if (result.isOk()) {
			const json = await result.getValue()!.json() as ResponseMonthEntity;
			return FetcherResult.ok(converterMap['month'].convertSingleFromResponse(json));
		} else {
			return FetcherResult.err(result.getError()!);
		}
	}
}