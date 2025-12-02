<script lang="ts">
  import type { EventEntity } from '$lib/entities/event/event_entity';
	import { formatDateTime } from "$lib/state/events/eventTime";

  type Props = {
    events: EventEntity[];
    onRemove: (eventId: EventEntity["eventId"]) => void;
  };

  const { events = [], onRemove }: Props = $props();
</script>

{#if events.length > 0}
  <div class="mt-6">
    <h3 class="font-medium text-gray-900 mb-3">Новые события</h3>
    <div class="space-y-2">
      {#each events as event (event.eventId)}
        <div class="bg-gray-100 rounded-lg p-3 border-l-4 border-green-500">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">
                {event.eventName}
              </h4>
              {#if event.eventDescription}
                <p class="text-sm text-gray-600 mt-1">
                  {event.eventDescription}
                </p>
              {/if}
              <p class="text-xs text-gray-500 mt-1">
                {formatDateTime(event.startTime)} - {formatDateTime(
                  event.endTime
                )}
              </p>
            </div>
            <button
              onclick={() => onRemove(event.eventId)}
              class="text-red-500 hover:text-red-700 text-sm"
            >
              Удалить
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
