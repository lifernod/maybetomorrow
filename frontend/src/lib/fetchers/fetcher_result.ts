import { Result } from 'typescript-result';
import { FetchError } from '$lib/errors';
import { error } from '@sveltejs/kit';

export type Fetcher = typeof fetch;
export type FetcherResponse<T> = Promise<Result.Ok<T> | Result.Error<FetchError>>;


export class FetcherResult {
	public static async unwrapOrError<T>(result: FetcherResponse<T>): Promise<T> {
		const res = await result;
		if (res.ok) {
			return res.value!;
		} else {
			error(res.error.status, res.error.message);
		}
	}
}