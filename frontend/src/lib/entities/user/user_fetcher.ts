import type { Fetcher } from '$lib/api';
import { BaseFetcher } from '$lib/fetchers/base_fetcher';
import type { UserEntity } from '$lib/entities/user/user_entity';

export class UserFetcher extends BaseFetcher {
	constructor(fetcher: Fetcher) {
		super(fetcher);
	}

	// Cookies have to have fields { username: string, password_hash: string }
	public async checkUser() {
		return await this.fetchBoolean('user', {
			endpoint: '/user/checkUser',
			method: "GET",
			includeCredentials: true,
		});

	}

	public async createUser(user: UserEntity) {
		return await this.fetchBoolean('user', {
			endpoint: '/user/create',
			method: "POST",
			body: user
		});
	}
}