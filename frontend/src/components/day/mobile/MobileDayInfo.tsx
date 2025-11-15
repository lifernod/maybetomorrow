import { Day } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { Show } from "solid-js";

type MobileDayInfoProps = {
  dayNumber: Day["day_number"];
  eventsCount?: number;
};

export default function MobileDayInfo(props: MobileDayInfoProps) {
  return (
    <div class="flex flex-col items-center justify-center w-full h-full">
      <h1>{props.dayNumber}</h1>
      <Show when={props.eventsCount}>
        {(eventsCount) => <h3 class="text-xs">{eventsCount()}</h3>}
      </Show>
    </div>
  );
}
