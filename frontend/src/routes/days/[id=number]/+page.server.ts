import type { PageServerLoad } from './$types';
import { ApiFetcher } from '$lib/fetchers/api_fetcher';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const events = (
		await ApiFetcher
			.fetcher(fetch)
			.day()
			.getEventsById(Number.parseInt(params.id))
	).unwrapOrError();

	return {
		events
	}
}