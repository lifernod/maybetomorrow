<script lang="ts">
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

  function onCreateEvent(events: Partial<Event>[]) {}
</script>

{#if selectedDay !== null}
  <DayMenu
    day={selectedDay}
    onClose={() => (selectedDay = null)}
    {onCreateEvent}
  />
{/if}

<tbody>
  {#each days as week}
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
