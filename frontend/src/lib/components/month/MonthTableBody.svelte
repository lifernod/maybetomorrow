<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import { Day, DayType, type Event } from "$lib/types";
  import DayInfo from "../day/DayInfo.svelte";
  import DayMenu from "../day/DayMenu.svelte";

  // Используем $props() вместо export let
  const { 
    days, 
    monthNumber, 
    onSelectedDaysChange // Добавляем пропс
  }: {
    days: Day[][];
    monthNumber: number;
    onSelectedDaysChange?: (days: number[]) => void;
  } = $props();

  let selectedDay = $state<Day | null>(null);
  let selectedDays = $state<Set<number>>(new Set());
  
  function selectDay(day: Day, event: MouseEvent) {
    if (day.day_type === DayType.Uneditable) return;
    
    // Ctrl+клик или Cmd+клик для выбора нескольких дней
    if (event.ctrlKey || event.metaKey) {
      if (selectedDays.has(day.day_number)) {
        selectedDays.delete(day.day_number);
      } else {
        selectedDays.add(day.day_number);
      }
      
      // Вызываем callback если он передан
      if (onSelectedDaysChange) {
        onSelectedDaysChange(Array.from(selectedDays));
      }
    } else {
      // Обычный клик - открываем меню события
      selectedDay = day;
    }
  }

  let optimisticDays = $state(days);

  async function optimisticUpdateDay(day: Day, events: Partial<Event>[]) {
    const result = await Day.createDay(day);

    optimisticDays = optimisticDays.map((week) => {
      return week.map((d) => {
        if (
          d.day_number === selectedDay!.day_number &&
          d.month_number === selectedDay!.month_number
        ) {
          return result;
        }
        return d;
      });
    });

    selectedDay = null;
  }
</script>

{#if selectedDay !== null}
  <DayMenu
    day={selectedDay}
    onClose={() => (selectedDay = null)}
    onCreateEvent={optimisticUpdateDay}
  />
{/if}

<tbody>
  {#each optimisticDays as week}
    <tr>
      {#each week as day}
        <td
          onclick={(e) => selectDay(day, e)}
          class={{
            "day day-uneditable": day.day_type === DayType.Uneditable,
            "day day-undefined": day.day_type === DayType.Undefined && !selectedDays.has(day.day_number),
            "day day-busy": day.day_type === DayType.Busy && !selectedDays.has(day.day_number),
            "day day-free": day.day_type === DayType.Free && !selectedDays.has(day.day_number),
            "day day-selected": selectedDays.has(day.day_number),
          }}
        >
          <DayInfo
            dayNumber={day.day_number}
            eventsCount={day.events?.length}
          />
        </td>
      {/each}
    </tr>
  {/each}
</tbody>

<style>
  .day-selected {
    position: relative;
    border: 2px solid #ff6900 !important;
  }
  
  .day-selected::after {
    content: "✓";
    position: absolute;
    top: 5px;
    right: 5px;
    color: #ff6900;
    font-weight: bold;
  }
</style>