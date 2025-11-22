<script lang="ts">
	import { type Day, type Event } from '$lib/types';

	type Props = {
		day: Day;
		events: Event[];
		onCreateEvent: (event: Partial<Event>[]) => void;
		onClose: () => void;
	};

	const { day, events, onCreateEvent, onClose }: Props = $props();

	const dayInfo = $derived(day.getDayInfo());

	const newEvents = $state<Partial<Event>[]>([]);
	const newEvent = $state<Partial<Event>>({
		event_name: 'Название',
		event_description: 'Описание',
		event_start: new Date()
	});

	const allEvents = $derived([...events, ...newEvents]);

	function setNewEvent(e: SubmitEvent) {
		e.preventDefault();
		newEvents.push(newEvent);
	}
</script>

<div class="absolute top-0 left-0 h-screen w-full bg-gray-100/50">
	<div class="mx-auto flex w-fit flex-col items-center justify-center bg-white px-22 py-12">
		<h1 class="mb-3 text-lg font-semibold">{dayInfo}</h1>
		<section class="w-64 space-y-3">
			{#each allEvents as event}
				<div class="rounded border border-primary p-3">
					<h1 class="font-medium">{event.event_name}</h1>
					<p class="text-sm">{event.event_description}</p>
				</div>
			{/each}

			<form class="space-y-2" onsubmit={setNewEvent}>
				<input placeholder="Название" class="input" type="text" bind:value={newEvent.event_name} />
				<textarea
					placeholder="Описания"
					class="input"
					rows={6}
					bind:value={newEvent.event_description}
				></textarea>
				<input type="date" bind:value={newEvent.event_start} />
				<button type="submit">Добавить</button>
			</form>
		</section>
		<section class="mt-5 flex w-full items-center justify-between gap-5">
			<button onclick={() => onCreateEvent(newEvents)} class="btn btn-primary"> Сохранить </button>
			<button class="btn btn-gray" onclick={onClose}> Отмена </button>
		</section>
	</div>
</div>
