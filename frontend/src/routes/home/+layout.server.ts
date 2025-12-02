import type { LayoutServerLoad } from './$types';
import { ApiFetcher } from '$lib/fetchers/api_fetcher';
import { FetcherResult } from '$lib/fetchers/fetcher_result';

export const load: LayoutServerLoad = async ({ fetch }) => {

	return {
		month: await FetcherResult.unwrapOrError(
			ApiFetcher
				.fetcher(fetch)
				.month()
				.getCurrentMonth()
		)
	}
}