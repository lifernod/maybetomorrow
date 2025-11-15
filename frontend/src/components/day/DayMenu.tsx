import { Day } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { For } from "solid-js";
import { createStore } from "solid-js/store";

type DayMenuProps = {
  day: Day;
  events: Event[];
  onCreateEvent: (event: Partial<Event>[]) => void;
  onClose: () => void;
};

export default function DayMenu(props: DayMenuProps) {
  const dayInfo = props.day.getDayInfo();

  const [newEvents, setNewEvents] = createStore<Partial<Event>[]>([]);

  const createEmptyEvent = () => {
    setNewEvents(newEvents.length, {
      event_name: "Название события",
      event_description: "Описание",
    });
  };

  return (
    <div class="absolute top-0 left-0 w-full h-screen bg-gray-100/50">
      <div class="bg-white w-fit mx-auto px-22 py-12 flex flex-col items-center justify-center">
        <h1 class="text-lg font-semibold mb-3">{dayInfo}</h1>
        <section class="space-y-3 w-64">
          <For each={props.events}>
            {(event) => (
              <div class="border rounded border-primary p-3">
                <h1 class="font-medium">{event.event_name}</h1>
                <p class="text-sm">{event.event_description}</p>
              </div>
            )}
          </For>
          <For each={newEvents}>
            {(event, index) => {
              const newEvent = newEvents[index()];

              return (
                <form class="space-y-2">
                  <input
                    placeholder="Название"
                    class="input"
                    type="text"
                    value={newEvent.event_name}
                    onChange={(e) =>
                      setNewEvents(index(), "event_name", e.target.value)
                    }
                  />
                  <textarea
                    placeholder="Описания"
                    class="input"
                    rows={6}
                    value={newEvent.event_description}
                    onChange={(e) =>
                      setNewEvents(index(), "event_description", e.target.value)
                    }
                  ></textarea>
                </form>
              );
            }}
          </For>
          <button
            onClick={createEmptyEvent}
            class="border border-dashed rounded border-gray-600 p-3 w-full"
          >
            +
          </button>
        </section>
        <section class="flex w-full items-center justify-between mt-5 gap-5">
          <button
            onClick={[props.onCreateEvent, newEvents]}
            class="btn btn-primary"
          >
            Сохранить
          </button>
          <button class="btn btn-gray" onClick={props.onClose}>
            Отмена
          </button>
        </section>
      </div>
    </div>
  );
}
