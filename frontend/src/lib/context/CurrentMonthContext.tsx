import { Day } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { Month, MonthInfo } from "$lib/types/month";
import {
  Accessor,
  createContext,
  createSignal,
  JSXElement,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

type CurrentMonthState = {
  month: Month;
  events: Record<Event["event_id"], Event>;
};

type CurrentMonthManager = {
  state: CurrentMonthState;

  //   Getters
  monthInfo: Accessor<MonthInfo>;
  days: Accessor<Day[][]>;

  getDayById: (dayId: Day["day_id"]) => Day | undefined;
  getDayEvents: (dayId: Day["day_id"]) => Event[];

  //   Setters
  setLoadedEvent: (event: Event) => void;
};

const CurrentMonthContext = createContext<CurrentMonthManager>();
export function CurrentMonthProvider(props: {
  children: JSXElement;
  month: Month;
}) {
  const [state, setState] = createStore<CurrentMonthState>({
    month: props.month,
    events: {},
  });

  createSignal(() => {
    if (props.month) {
      setState("month", props.month);
    }
  });

  //   Getters
  const monthInfo = () => state.month.monthInfo;
  const days = () => state.month.days;

  const getDayById = (dayId: Day["day_id"]) => {
    for (const week of state.month.days) {
      const found = week.find((day) => day.day_id === dayId);
      if (found) return found;
    }
    return undefined;
  };

  const getDayEvents = (dayId: Day["day_id"]) => {
    const day = getDayById(dayId);

    if (day) {
      let events: Event[] = [];
      for (const eventId of day.events) {
        events.push(state.events[eventId]);
      }

      return events;
    }
    return [];
  };

  //   Setters
  const setLoadedEvent = (event: Event) => {
    setState("events", event.event_id, event);
  };

  const currentMonthManager: CurrentMonthManager = {
    state,

    monthInfo,
    days,
    getDayById,
    getDayEvents,

    setLoadedEvent,
  };

  return (
    <CurrentMonthContext.Provider value={currentMonthManager}>
      {props.children}
    </CurrentMonthContext.Provider>
  );
}

export function useCurrentMonth() {
  const ctx = useContext(CurrentMonthContext);

  if (!ctx) {
    throw new Error(
      "CurrentMonthContext должен использоваться только внутри CurrentMonthProvider"
    );
  }

  return ctx;
}
