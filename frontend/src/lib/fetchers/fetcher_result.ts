import { Result } from 'typescript-result';
import { FetchError } from '$lib/errors';
import { error } from '@sveltejs/kit';

export type Fetcher = typeof fetch;

export type FetcherResponse<T> = Result.Ok<T> | Result.Error<FetchError>;
export type AsyncFetcherResponse<T> = Promise<FetcherResponse<T>>;

export class FetcherResult<T> {
	private constructor(
		private readonly result: FetcherResponse<T>
	) {}

	static ok<T>(value: T): FetcherResult<T> {
		return new FetcherResult(Result.ok(value));
	}

	static err<T = never>(err: FetchError): FetcherResult<T> {
		return new FetcherResult(Result.error(err));
	}

	static wrap<T>(response: FetcherResponse<T>): FetcherResult<T> {
		return new FetcherResult(response);
	}

	isOk(): boolean {
		return this.result.ok;
	}

	isError(): boolean {
		return !this.result.ok;
	}

	getError(): FetchError | null {
		return this.result.ok ? null : this.result.error;
	}

	getValue(): T | null {
		return this.result.getOrNull();
	}

	unwrapOrError(): T {
		if (this.result.ok) {
			return this.result.value!;
		}

		const err = this.result.error;
		error(err.status, err.message);
	}
}