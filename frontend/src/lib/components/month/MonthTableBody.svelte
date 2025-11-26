<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import { Day, DayType, type Event } from "$lib/types";
  import DayInfo from "../day/DayInfo.svelte";
  import DayMenu from "../day/DayMenu.svelte";

  type Props = {
    days: Day[][];
  };

  const { days }: Props = $props();

  let selectedDay = $state<Day | null>(null);
  function selectDay(day: Day) {
    if (day.day_type !== DayType.Uneditable) {
      selectedDay = day;
    }
  }

  let optimisticDays = $state(days);

  $effect(() => {
    $inspect(optimisticDays);
  });

  function optimisticUpdateDay(newDay: Day) {
    optimisticDays = optimisticDays.map((week) => {
      return week.map((day) => {
        if (
          day.day_number === selectedDay!.day_number &&
          day.month_number === selectedDay!.month_number
        ) {
          return newDay;
        }
        return day;
      });
    });

    selectedDay = null;
  }

  async function onCreateEvent(day: Day, events: Partial<Event>[]) {
    const result = await Day.createDay(day);
    if (result && selectedDay) {
      optimisticUpdateDay(result);
      // refreshAll({ includeLoadFunctions: true });
    }
  }
</script>

{#if selectedDay !== null}
  <DayMenu
    day={selectedDay}
    onClose={() => (selectedDay = null)}
    {onCreateEvent}
  />
{/if}

<tbody>
  {#each optimisticDays as week}
    <tr>
      {#each week as day}
        <td
          onclick={() => selectDay(day)}
          class={{
            "day day-uneditable": day.day_type === DayType.Uneditable,
            "day day-undefined": day.day_type === DayType.Undefined,
            "day day-busy": day.day_type === DayType.Busy,
            "day day-free": day.day_type === DayType.Free,
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
