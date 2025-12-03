import { FetchError } from '$lib/errors';
import type { EntityOf, Keys, MaybeListEntityOf, MaybeListResponseOf } from '$lib/typeUtils/typesList';
import { createApiUrl } from '$lib/api';
import { converterMap } from '$lib/typeUtils/converterMap';
import  { type Fetcher, FetcherResult } from './fetcher_result';

type BaseRawFetcherProps = {
	endpoint: string,
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
	includeCredentials?: boolean,
	headers?: Headers,
	body?: BodyInit
}

type BaseFetcherProps<K extends Keys, Body extends MaybeListEntityOf<K>> =
	Omit<BaseRawFetcherProps, 'body'>
	& { body?: Body }

export class BaseFetcher {
	protected readonly fetcher: Fetcher;

	protected constructor(
		fetcher: Fetcher,
	) {
		this.fetcher = fetcher;
	}

	protected async rawFetch(props: BaseRawFetcherProps): Promise<FetcherResult<Response>> {
		const response = await this.fetcher(createApiUrl(props.endpoint), props);

		if (!response.ok) {
			return FetcherResult.err(new FetchError(response.status, response.statusText));
		}

		return FetcherResult.ok(response);
	}

	protected async rawFetchWithInit(
		endpoint: BaseRawFetcherProps["endpoint"],
		init: RequestInit
	): Promise<FetcherResult<Response>> {
		const response = await this.fetcher(createApiUrl(endpoint), init);
		if (!response.ok) {
			return FetcherResult.err(new FetchError(response.status, response.statusText));
		}

		return FetcherResult.ok(response);
	}


	protected async fetchBoolean<
		K extends Keys, Body extends MaybeListEntityOf<K>
	>(
		key: K,
		props: BaseFetcherProps<K, Body>
	): Promise<FetcherResult<boolean>> {
		const init = this.prepareInit(key, props);
		const response = await this.rawFetchWithInit(props.endpoint, init);

		if (response.isOk()) {
			return FetcherResult.ok(true);
		} else {
			return FetcherResult.err(response.getError()!);
		}
	}


	private prepareInit<
		K extends Keys,
		Body extends MaybeListEntityOf<K>
	>(
		key: K,
		props: BaseFetcherProps<K, Body>,
	) {
		const converter = converterMap[key];

		const init: RequestInit = { method: props.method };

		const headers = new Headers(props.headers ?? {});
		if (props.body) {
			if (!headers.has("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}
			if (Array.isArray(props.body)) {
				init.body = JSON.stringify(converter.convertListToRequest(props.body));
			} else {
				init.body = JSON.stringify(converter.convertSingleToRequest(props.body as EntityOf<K>));
			}
		}
		init.headers = headers;

		if (props.includeCredentials) {
			init.credentials = "include";
		}
		return init;
	}

	private async processJson<K extends Keys>(
		key: K,
		endpoint: BaseRawFetcherProps["endpoint"],
		response: Response
	): Promise<FetcherResult<MaybeListEntityOf<K>>> {
		const converter = converterMap[key];

		try {
			const json = await response.json() as MaybeListResponseOf<K>;
			if (Array.isArray(json)) {
				return FetcherResult.ok(converter.convertListFromResponse(json));
			} else {
				return FetcherResult.ok(converter.convertSingleFromResponse(json));
			}
		} catch (err) {
			if (err instanceof SyntaxError) {
				return FetcherResult.err(
					new FetchError(422, "Failed to parse response from " + endpoint, { cause: err })
				);
			}

			if (err instanceof TypeError) {
				return FetcherResult.err(
					new FetchError(422, "Failed to process request body for " + endpoint, { cause: err })
				);
			}

			return FetcherResult.err(
				new FetchError(500, "Unknown fetch error at " + endpoint, { cause: err as Error })
			);
		}
	}

	protected async sendRequestSingle<K extends Keys>(
		key: K,
		props: BaseFetcherProps<K, EntityOf<K>>,
	): Promise<FetcherResult<EntityOf<K>>> {
		const init = this.prepareInit(key, props);
		const response = await this.fetcher(createApiUrl(props.endpoint), init);

		if (!response.ok) {
			return FetcherResult.err(new FetchError(response.status, response.statusText));
		}

		return (await this.processJson(key, props.endpoint, response) as FetcherResult<EntityOf<K>>);
	}

	protected async sendRequestList<K extends Keys>(
		key: K,
		props: BaseFetcherProps<K, Array<EntityOf<K>>>,
	): Promise<FetcherResult<Array<EntityOf<K>>>> {
		const init = this.prepareInit(key, props);
		const response = await this.fetcher(createApiUrl(props.endpoint), init);

		if (!response.ok) {
			return FetcherResult.err(new FetchError(response.status, response.statusText));
		}

		return (await this.processJson(key, props.endpoint, response) as FetcherResult<Array<EntityOf<K>>>);
	}
}
