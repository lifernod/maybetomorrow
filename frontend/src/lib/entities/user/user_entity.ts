import type { CamelKeysToSnake } from '$lib/typeUtils/rename';
import { Converter } from '$lib/typeUtils/convert';

export type UserEntity = {
	username: string;
	passwordHash: string;
}

export type ResponseUserEntity = CamelKeysToSnake<UserEntity>;


export class UserConverter extends Converter<'user'> {

	public convertSingleFromResponse(r: ResponseUserEntity): UserEntity {
		return {
			username: r.username,
			passwordHash: r.password_hash
		};
	}

	public convertSingleToRequest(entity: UserEntity): ResponseUserEntity {
		return {
			username: entity.username,
			password_hash: entity.passwordHash
		};
	}
}