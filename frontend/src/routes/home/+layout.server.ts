import type { LayoutServerLoad } from './$types';
import { ApiFetcher } from '$lib/fetchers/api_fetcher';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const currentMonth = (
		await ApiFetcher
			.fetcher(fetch)
			.month()
			.getCurrentMonth()
	).unwrapOrError();

	return {
		month: currentMonth
	}
}