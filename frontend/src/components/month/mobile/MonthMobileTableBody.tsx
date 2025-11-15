import DayInfo from "$components/day/DayInfo";
import DayMenu from "$components/day/DayMenu";
import MobileDayInfo from "$components/day/mobile/MobileDayInfo";
import { useCurrentMonth } from "$lib/context/CurrentMonthContext";
import { Day, DayType } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { createResource, createSignal, For, Show } from "solid-js";

export default function MonthMobileTableBody() {
  const { days } = useCurrentMonth();

  const [selectedDay, setSelectedDay] = createSignal<Day | null>(null);

  const [selectedDayEvents] = createResource(
    () => selectedDay()?.day_id,
    Day.getEvents
  );

  const onCreateEvent = (events: Partial<Event>[]) => {
    alert("New events: " + JSON.stringify(events));
  };

  return (
    <>
      {/* <Show when={selectedDay() && selectedDayEvents()}>
        <DayMenu
          day={selectedDay()!}
          events={selectedDayEvents()!}
          onClose={() => setSelectedDay(null)}
          onCreateEvent={onCreateEvent}
        />
      </Show> */}
      <tbody class="flex flex-col gap-5">
        <For each={days()}>
          {(week) => (
            <tr class="flex items-center gap-3">
              <For each={week}>
                {(day) => (
                  <td
                    onClick={() =>
                      setSelectedDay(
                        day.day_type === DayType.Uneditable ? null : day
                      )
                    }
                    classList={{
                      "mday day-uneditable":
                        day.day_type === DayType.Uneditable,
                      "mday day-undefined": day.day_type === DayType.Undefined,
                      "mday day-busy": day.day_type === DayType.Busy,
                      "mday day-free": day.day_type === DayType.Free,
                    }}
                  >
                    <MobileDayInfo
                      dayNumber={day.day_number}
                      eventsCount={day.events.length}
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </>
  );
}
