import { EventFetcher } from '$lib/apiFetchers/eventFetcher';
import { DayFetcher } from '$lib/apiFetchers/dayFetcher';
import type { Fetcher } from '$lib/api';
import { MonthFetcher } from '$lib/apiFetchers/monthFetcher';

export class ApiFetcher {
	private readonly fetcher: Fetcher;

	private constructor(fetcher: Fetcher) {
		this.fetcher = fetcher;
	}

	public static fetcher(fetcher: Fetcher): ApiFetcher {
		return new ApiFetcher(fetcher);
	}

	public event() {
		return new EventFetcher(this.fetcher);
	}

	public day() {
		return new DayFetcher(this.fetcher);
	}

	public month() {
		return new MonthFetcher(this.fetcher);
	}
}