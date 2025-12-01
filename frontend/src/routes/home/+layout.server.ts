import type { LayoutServerLoad } from './$types';
import { ApiFetcher } from '$lib/apiFetchers/apiFetcher';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const result = await ApiFetcher
		.fetcher(fetch)
		.month()
		.getCurrentMonth();

	if (result.ok) {
		const value = result.value;
		return {
			month: value
		}
	} else {
		const err = result.error;
		error(err.status, err.message);
	}
}