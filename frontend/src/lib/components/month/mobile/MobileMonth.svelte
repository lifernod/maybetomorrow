<script lang="ts">
  import { refreshAll } from "$app/navigation";
  import { Day, DayType, type Event } from "$lib/types";
  import DayInfo from "$lib/components/day/DayInfo.svelte";
  import DayMenu from "$lib/components/day/DayMenu.svelte";

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

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

  async function optimisticUpdateDay(day: Day, events: Partial<Event>[]) {
    const result = await Day.createDay(day);

    optimisticDays = optimisticDays.map((week) => {
      return week.map((day) => {
        if (
          day.day_number === selectedDay!.day_number &&
          day.month_number === selectedDay!.month_number
        ) {
          return result;
        }
        return day;
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

<div class="flex flex-col items-center justify-evenly gap-2">
  <div class="flex items-center justify-evenly w-full">
    {#each weekDays as weekDay}
      <h1 class="text-center font-medium">
        {weekDay}
      </h1>
    {/each}
  </div>

  {#each optimisticDays as week}
    <div class="flex items-center gap-2">
      {#each week as day}
        <button
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
        </button>
      {/each}
    </div>
  {/each}
</div>
