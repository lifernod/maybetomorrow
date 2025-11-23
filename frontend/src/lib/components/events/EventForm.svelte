<script lang="ts">
  import { Event } from "$lib/types/event";
  import {
    generateTimeSlots,
    type TimeSlot,
  } from "$lib/utils/events/dateUtils";

  type Props = {
    isOpen: boolean;
    onSave: (event: Partial<Event>) => void;
    onCancel: () => void;
  };

  const { isOpen = false, onSave, onCancel }: Props = $props();

  let timeSlots = $state<TimeSlot[]>(generateTimeSlots());
  let time = $state("08:00");
  let endTime = $state("09:00");
  let eventData = $state({
    name: "",
    description: "",
  });

  const saveEvent = () => {
    if (!eventData.name.trim()) return;

    const [startHours, startMinutes] = time.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    if (endDate <= startDate) {
      alert("Время окончания должно быть позже времени начала");
      return;
    }

    const newEvent: Partial<Event> = {
      event_name: eventData.name,
      event_description: eventData.description,
      event_start: startDate,
      event_end: endDate,
      event_id: -Math.floor(Math.random() * 10000),
    };

    onSave(newEvent);
    resetForm();
  };

  const resetForm = () => {
    eventData = { name: "", description: "" };
    time = "08:00";
    endTime = "09:00";
  };

  $effect(() => {
    if (!isOpen) {
      resetForm();
    }
  });
</script>

{#if isOpen}
  <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <h3 class="font-medium text-gray-900 mb-3">Новое событие</h3>

    <div class="space-y-3">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Время начала
        </label>
        <select
          value={time}
          onchange={(e) => (time = e.currentTarget.value)}
          class="input w-full"
        >
          {#each timeSlots as slot}
            <option value={slot.time}>{slot.time}</option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Время окончания
        </label>
        <select
          value={endTime}
          onchange={(e) => (endTime = e.currentTarget.value)}
          class="input w-full"
        >
          {#each timeSlots as slot}
            <option
              value={slot.time}
              disabled={slot.hour <= parseInt(time.split(":")[0])}
            >
              {slot.time}
            </option>
          {/each}
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Название события
        </label>
        <input
          type="text"
          value={eventData.name}
          oninput={(e) => (eventData.name = e.currentTarget.value)}
          placeholder="Введите название события"
          class="input w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Описание
        </label>
        <textarea
          value={eventData.description}
          oninput={(e) => (eventData.description = e.currentTarget.value)}
          placeholder="Добавьте описание (необязательно)"
          rows={2}
          class="input w-full resize-none"
        />
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
{/if}
