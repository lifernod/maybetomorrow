<script lang="ts">
	import { useEventForm } from "$lib/state/events/eventForm.svelte";
  import { type VisualEvent } from "$lib/state/events/eventLayout";
  import { getEventTop, getEventHeight } from "$lib/state/events/eventLayout";
  import {
    formatNumberTime,
    getEventTimeText,
    type Time,
  } from "$lib/state/events/eventTime";
  import { generateTimeSlots } from "$lib/state/events/timeslot";

  const { events }: { events: VisualEvent[] } = $props();

  let timeSlots = $state<Time[]>(generateTimeSlots());
</script>

<div class="relative">
  <div class="space-y-1">
    {#each timeSlots as timeSlot, idx (idx)}
      <div
        class="flex items-start gap-4 py-2 min-h-[60px] border-b border-gray-100 relative"
      >
        <div class="w-16 shrink-0 pt-1">
          <span class="text-sm font-medium text-gray-600">
            {formatNumberTime(timeSlot.hours)}
          </span>
        </div>

        <div
          class="flex-1 min-w-0 h-[60px] relative border border-transparent rounded-lg"
        >
          <!-- Empty area for events -->
        </div>
      </div>
    {/each}
  </div>

  {#each events as event (event.eventId)}
    <div
      class={`absolute border-l-4 rounded-lg p-2 shadow-sm ${event.color} border-l-4 overflow-hidden`}
      style:top={`${getEventTop(event)}px`}
      style:height={`${getEventHeight(event)}px`}
      style:left={`calc(4rem + ${event.left}% + 8px)`}
      style:width={`calc(${event.width}% - 16px)`}
      style:z-index={10}
      style:max-width={`calc(100% - 4rem - 16px)`}
    >
      <h3 class="font-medium text-xs mb-1 leading-tight wrap-break-words">
        {event.eventName}
      </h3>
      {#if event.eventDescription}
        <p
          class="text-xs text-opacity-80 mb-1 line-clamp-1 leading-tight wrap-break-words"
        >
          {event.eventDescription}
        </p>
      {/if}
      <p class="text-xs text-opacity-60 leading-tight wrap-break-words">
        {getEventTimeText({event_start: event.startTime, event_end: event.endTime})}
      </p>
    </div>
  {/each}
</div>
