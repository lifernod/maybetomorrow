export class ConvertError extends Error {
	readonly type = "data-convert-error";
}

export class FetchError extends Error {
	readonly type = "external-api-fetch-error";
	status: number = 500;

	constructor(status: number = 500, message: string, options?: ErrorOptions) {
		super(`Fetch failed with status ${status}: ${message}`, options);

		this.status = status;
	}

}