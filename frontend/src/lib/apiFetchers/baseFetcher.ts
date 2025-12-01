import { Result } from 'typescript-result';
import { FetchError } from '$lib/errors';
import type { EntityOf, Keys, ResponseOf } from '$lib/typeUtils/typesList';
import type { Converter } from '$lib/typeUtils/convert';
import { createApiUrl } from '$lib/api';
import { converterMap } from '$lib/typeUtils/converterMap';

export type Fetcher = typeof fetch;
export type FetcherResponse<T> = Promise<Result.Ok<T> | Result.Error<FetchError>>;

type BaseRawFetcherProps = {
	endpoint: string,
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
	includeCredentials?: boolean,
	headers?: Headers,
	body?: BodyInit
}

type BaseFetcherProps<K extends Keys> = BaseRawFetcherProps & { body?: EntityOf<K> | EntityOf<K>[] };


export class BaseFetcher {
	protected readonly fetcher: Fetcher;

	protected constructor(
		fetcher: Fetcher,
	) {
		this.fetcher = fetcher;
	}

	protected async rawFetch<From>(props: BaseRawFetcherProps): FetcherResponse<From> {
		const response = await this.fetcher(createApiUrl(props.endpoint), props);

		if (!response.ok) {
			return Result.error(new FetchError(response.status, response.statusText));
		}

		try {
			const json = await response.json() as From;
			return Result.ok(json);
		} catch (err) {
			if (err instanceof SyntaxError) {
				return Result.error(
					new FetchError(422, "Failed to parse response from " + props.endpoint, { cause: err })
				);
			}

			if (err instanceof TypeError) {
				return Result.error(
					new FetchError(422, "Failed to process request body for " + props.endpoint, { cause: err })
				);
			}

			return Result.error(
				new FetchError(500, "Unknown fetch error at " + props.endpoint, { cause: err as Error })
			);
		}
	}

	protected async sendRequest<K extends Keys>(
		key: K,
		props: BaseFetcherProps<K>,
	): FetcherResponse<EntityOf<K> | EntityOf<K>[]> {
		const converter = converterMap[key];

		const init: RequestInit = { method: props.method };

		const headers = new Headers(props.headers ?? {});
		if (props.body) {
			if (!headers.has("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}
			if (Array.isArray(props.body)) {
				const items = converter.convertListToRequest(props.body);
				init.body = JSON.stringify(items);
			} else {
				init.body = JSON.stringify(converter.convertSingleToRequest(props.body));
			}
		}
		init.headers = headers;

		if (props.includeCredentials) {
			init.credentials = "include";
		}

		const response = await this.fetcher(createApiUrl(props.endpoint), init);

		if (!response.ok) {
			return Result.error(new FetchError(response.status, response.statusText));
		}

		try {
			const json = await response.json() as ResponseOf<K>;
			if (Array.isArray(json)) {
				const result = converter.convertListFromResponse(json);
				return Result.ok(result);
			}
			return Result.ok(converter.convertSingleFromResponse(json));
		} catch (err) {
			if (err instanceof SyntaxError) {
				return Result.error(
					new FetchError(422, "Failed to parse response from " + props.endpoint, { cause: err })
				);
			}

			if (err instanceof TypeError) {
				return Result.error(
					new FetchError(422, "Failed to process request body for " + props.endpoint, { cause: err })
				);
			}

			return Result.error(
				new FetchError(500, "Unknown fetch error at " + props.endpoint, { cause: err as Error })
			);
		}
	}
}
