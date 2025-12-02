<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';
	import { DayType } from '$lib/entities/day/day_entity';
	import DayPage from '../days/[id=number]/+page.svelte'
	import { getEventsCountString } from '$lib/entities/day/day_utils';
	import { preloadData, pushState } from '$app/navigation';

	const { data }: PageProps = $props();

	let days = $derived(data.month.days);
	//
	// async function optimisticUpdateDay(day: DayEntity, events: EventEntity[]) {
	// 	const result = await Day.createDay(day);
	//
	// 	days = days.map((week) => {
	// 		return week.map((day) => {
	// 			if (
	// 				day.dayNumber === selectedDay!.dayNumber &&
	// 				day.monthNumber === selectedDay!.monthNumber
	// 			) {
	// 				return result;
	// 			}
	// 			return day;
	// 		});
	// 	});
	//
	// 	selectedDay = null;
	// }
</script>

<svelte:head>
	<title>Мой месяц | maybetomorrow</title>
</svelte:head>

{#if page.state.events}
	<DayPage data={{day: page.state.day, events: page.state.events}}/>
{/if}

<tbody>
	{#each days as week, idx (idx)}
		<tr>
			{#each week as day (day.dayNumber)}
				{@const eventsCount = day.events.length}
				<td
					onclick={async () => {
					const href = `/days/${day.dayId}`;

					const result = await preloadData(href);
					if (result.type === "loaded" && result.status === 200) {
						pushState(href, { day, events: result.data });
					} else {
						alert("BITCH!", result.status, result.data)
					}
				}}
					class={{
            "day day-uneditable": day.dayType === DayType.Uneditable,
            "day day-undefined": day.dayType === DayType.Undefined,
            "day day-busy": day.dayType === DayType.Busy,
            "day day-free": day.dayType === DayType.Free,
          }}
				>
					<div>
						<h1>{day.dayNumber}</h1>
						{#if eventsCount}
							<h3 class="mt-2 text-xs">
								{getEventsCountString(eventsCount)}
							</h3>
						{/if}
					</div>
				</td>
			{/each}
		</tr>
	{/each}
	</tbody>

