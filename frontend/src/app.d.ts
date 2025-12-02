// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { DependenciesContainer } from '$lib/dependencies';
import type { AwilixContainer } from 'awilix';
import type { EventEntity } from '$lib/entities/event/event_entity';
import type { DayEntity } from '$lib/entities/day/day_entity';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			container: AwilixContainer<DependenciesContainer> // For dependency injection
		}
		// interface PageData { }
		interface PageState {
			day?: DayEntity;
			events?: EventEntity[];
		}
		// interface Platform {}
	}
}

export {};
