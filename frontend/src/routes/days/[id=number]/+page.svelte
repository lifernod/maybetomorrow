<script lang="ts">
	import { type DayEntity } from '$lib/entities/day/day_entity';
	import type { EventEntity } from '$lib/entities/event/event_entity';
	import { getDayInfo } from '$lib/entities/day/day_utils';
	import TimeLine from '$lib/components/events/TimeLine.svelte';
	import EventForm from '$lib/components/events/EventForm.svelte';
	import NewEventsList from '$lib/components/events/NewEventsList.svelte';
	import { calculateVisualEvents, type VisualEvent } from '$lib/state/events/eventLayout';

	type PageData = {
		data: {
			day: DayEntity;
			events: EventEntity[];
		}
	}

	const { data }: PageData = $props();

	const dayInfo = getDayInfo(data.day);

	let newEvents = $state<EventEntity[]>([]);
	let visualEvents = $state<VisualEvent[]>([]);
	let isAddingEvent = $state(false);

	$effect(() => {
		const allEvents: EventEntity[] = [...newEvents];
		visualEvents = calculateVisualEvents(allEvents);
	});

	const createEmptyEvent = () => {
		isAddingEvent = true;
	};

	const onSave = (event: EventEntity) => {
		newEvents.push(event);
		isAddingEvent = false;
	};

	const onCancel = () => {
		isAddingEvent = false;
	};

	const removeNewEvent = (eventId: number) => {
		newEvents = newEvents.filter((event) => event.eventId !== eventId);
	};

	const handleSaveAll = () => {
		
	};
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
	<div
		class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden"
	>
		<!-- Header -->
		<div class="bg-primary text-white p-6">
			<h1 class="text-2xl font-alternates font-semibold text-center">
				{dayInfo}
			</h1>
		</div>

		<!-- Content -->
		<div class="p-6 max-h-[60vh] overflow-y-auto">
			<TimeLine events={visualEvents} />

			<!-- Add Event Button -->
			<div class="mt-6 flex justify-center">
				<button
					onclick={createEmptyEvent}
					class="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary hover:bg-gray-50 transition-colors"
				>
					<span class="text-lg">+</span>
					<span class="font-medium">Добавить событие</span>
				</button>
			</div>

			<!-- Event Form -->
			{#if isAddingEvent}
				<EventForm {onSave} {onCancel} />
			{/if}

			<!-- New Events List -->
			<NewEventsList events={newEvents} onRemove={removeNewEvent} />
		</div>

		<!-- Footer -->
		<div class="border-t border-gray-200 p-6 bg-gray-50">
			<div class="flex gap-3">
				<button onclick={handleSaveAll} class="btn btn-primary flex-1">
					Сохранить все изменения
				</button>
				<button onclick={() => history.back()} class="btn btn-gray flex-1"> Закрыть </button>
			</div>
		</div>
	</div>
</div>
