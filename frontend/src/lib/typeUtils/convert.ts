import type { EntityOf, Keys, ResponseOf } from '$lib/typeUtils/typesList';

export abstract class Converter<K extends Keys> {
	public abstract convertSingleFromResponse(r: ResponseOf<K>): EntityOf<K>;
	public abstract convertSingleToRequest(entity: EntityOf<K>): ResponseOf<K>;

	public convertListFromResponse(r: ResponseOf<K>[]): EntityOf<K>[] {
		return r.map(it => this.convertSingleFromResponse(it));
	}

	public convertListToRequest(entities: EntityOf<K>[]): ResponseOf<K>[] {
		return entities.map(it => this.convertSingleToRequest(it));
	}

}