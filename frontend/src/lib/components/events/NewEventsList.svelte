<script lang="ts">
  import { Event } from "$lib/types/event";
  import { formatDateTime } from "$lib/utils/events/eventTime";

  type Props = {
    events: Partial<Event>[];
    onRemove: (eventId: Event["event_id"]) => void;
  };

  const { events = [], onRemove }: Props = $props();
</script>

{#if events.length > 0}
  <div class="mt-6">
    <h3 class="font-medium text-gray-900 mb-3">Новые события</h3>
    <div class="space-y-2">
      {#each events as event}
        <div class="bg-gray-100 rounded-lg p-3 border-l-4 border-green-500">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">
                {event.event_name}
              </h4>
              {#if event.event_description}
                <p class="text-sm text-gray-600 mt-1">
                  {event.event_description}
                </p>
              {/if}
              <p class="text-xs text-gray-500 mt-1">
                {formatDateTime(event.event_start)} - {formatDateTime(
                  event.event_end
                )}
              </p>
            </div>
            <button
              onclick={() => onRemove(event.event_id!)}
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
