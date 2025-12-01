import type { EntityOf, Keys, ObjectOf, ResponseOf } from '$lib/typeUtils/typesList';

export abstract class Converter<K extends Keys> {
	public abstract convertSingleFromResponse(r: ResponseOf<K>): EntityOf<K>;
	public abstract convertSingleToRequest(entity: EntityOf<K>): ResponseOf<K>;
	public abstract serialize(entity: EntityOf<K>): ObjectOf<K>;
	public abstract deserialize(obj: ObjectOf<K>): EntityOf<K>;

	public convertListFromResponse(r: ResponseOf<K>[]): EntityOf<K>[] {
		return r.map(it => this.convertSingleFromResponse(it));
	}

	public convertListToRequest(entities: EntityOf<K>[]): ResponseOf<K>[] {
		return entities.map(it => this.convertSingleToRequest(it));
	}

	public serializeList(entities: EntityOf<K>[]): ObjectOf<K>[] {
		return entities.map(it => this.serialize(it));
	}

	public deserializeList(objs: ObjectOf<K>[]): EntityOf<K>[] {
		return objs.map(it => this.deserialize(it));
	}
}