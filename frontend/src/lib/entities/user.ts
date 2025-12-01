import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';

export type UserEntityType = {
	username: string;
	passwordHash: string;
}

export type ResponseUserEntity = CamelKeysToSnake<UserEntityType>;

export class UserEntity{
	public username: string;
	public passwordHash: string;

	constructor(obj: UserEntityType) {
		this.username = obj.username;
		this.passwordHash = obj.passwordHash;
	}
}

export class UserConverter extends Converter<'user'> {

	public convertSingleFromResponse(r: ResponseUserEntity): UserEntity {
		return new UserEntity({
			username: r.username,
			passwordHash: r.password_hash
		});
	}

	public convertSingleToRequest(entity: UserEntity): ResponseUserEntity {
		return {
			username: entity.username,
			password_hash: entity.passwordHash
		};
	}


	public serialize(entity: UserEntity): UserEntityType {
		return { ...entity };
	}

	public deserialize(obj: UserEntityType): UserEntity {
		return new UserEntity(obj);
	}
}