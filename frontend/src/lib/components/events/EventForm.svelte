<script lang="ts">
  import { Event } from "$lib/types/event";
  import { useEventForm } from "$lib/utils/events/eventForm.svelte";

  type Props = {
    onSave: (event: Partial<Event>) => void;
    onCancel: () => void;
  };

  const { onSave, onCancel }: Props = $props();

  let {
    timeSlots,
    eventTime,
    eventData,

    saveEvent,
  } = useEventForm(onSave);
</script>

<div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
  <h3 class="font-medium text-gray-900 mb-3">Новое событие</h3>

  <div class="space-y-3">
    <div>
      <label
        for="startTime"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Время начала
      </label>
      <select
        name="startTime"
        bind:value={eventTime.start.hours}
        class="input w-full"
      >
        {#each timeSlots as slot}
          <option value={slot.hours}>{slot.time}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="endTime" class="block text-sm font-medium text-gray-700 mb-1">
        Время окончания
      </label>
      <select
        name="endTime"
        bind:value={eventTime.end.hours}
        class="input w-full"
      >
        {#each timeSlots as slot}
          <option
            value={slot.hours}
            disabled={slot.hours <= eventTime.start.hours}
          >
            {slot.time}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <label
        for="eventName"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Название события
      </label>
      <input
        name="eventName"
        type="text"
        bind:value={eventData.name}
        placeholder="Введите название события"
        class="input w-full"
      />
    </div>

    <div>
      <label
        for="eventDescription"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        Описание
      </label>
      <textarea
        name="eventDescription"
        bind:value={eventData.description}
        placeholder="Добавьте описание (необязательно)"
        rows={2}
        class="input w-full resize-none"
      ></textarea>
    </div>

    <div class="flex gap-3 pt-2">
      <button
        onclick={saveEvent}
        disabled={!eventData.name.trim()}
        class="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Сохранить
      </button>
      <button onclick={onCancel} class="btn btn-gray flex-1"> Отмена </button>
    </div>
  </div>
</div>
