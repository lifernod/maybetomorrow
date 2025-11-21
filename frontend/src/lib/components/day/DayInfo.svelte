<script lang="ts">
	import { type Day, Event } from '$lib/types';

	type Props = {
		dayNumber: Day['day_number'];
		eventsCount?: number;
	};

	const { dayNumber, eventsCount = undefined }: Props = $props();
</script>

<div>
	<h1>{dayNumber}</h1>
	{#if eventsCount}
		<h3 class="mt-2 text-xs">
			{Event.getEventsCountString(eventsCount)}
		</h3>
	{/if}
</div>
