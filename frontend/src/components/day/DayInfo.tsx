import { Day } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { Show } from "solid-js";

type DayInfoProps = {
  dayNumber: Day["day_number"];
  eventsCount?: number;
};

export default function DayInfo(props: DayInfoProps) {
  return (
    <div>
      <h1>{props.dayNumber}</h1>
      <Show when={props.eventsCount}>
        {(eventsCount) => (
          <h3 class="mt-2 text-xs">
            {Event.getEventsCountString(eventsCount())}
          </h3>
        )}
      </Show>
    </div>
  );
}
