import { Event } from "$lib/types/event";
import type { EventTime } from "./eventTime";

export type VisualEvent = Event & {
  time: EventTime;

  color: string;
  column: number;
  totalColumns: number;
  width: number;
  left: number;
};

export const EVENT_COLORS = [
  "bg-blue-100 border-blue-300 text-blue-800",
  "bg-green-100 border-green-300 text-green-800",
  "bg-purple-100 border-purple-300 text-purple-800",
  "bg-yellow-100 border-yellow-300 text-yellow-800",
  "bg-pink-100 border-pink-300 text-pink-800",
  "bg-indigo-100 border-indigo-300 text-indigo-800",
  "bg-red-100 border-red-300 text-red-800",
  "bg-teal-100 border-teal-300 text-teal-800",
  "bg-lime-100 border-lime-300 text-lime-800",
  "bg-rose-100 border-rose-300 text-rose-800",
];

const eventsOverlap = (event1: VisualEvent, event2: VisualEvent): boolean => {
  return !(
    event1.time.end.hours < event2.time.start.hours ||
    event2.time.end.hours < event1.time.start.hours
  );
};

const assignEventColumns = (events: VisualEvent[]): VisualEvent[] => {
  const sortedEvents = [...events].sort(
    (a, b) => a.time.start.hours - b.time.start.hours
  );
  const columns: VisualEvent[][] = [];

  sortedEvents.forEach((event) => {
    let assignedColumn = -1;

    for (let i = 0; i < columns.length; i++) {
      const columnEvents = columns[i];
      const canPlaceInColumn = !columnEvents.some((existingEvent) =>
        eventsOverlap(event, existingEvent)
      );

      if (canPlaceInColumn) {
        assignedColumn = i;
        break;
      }
    }

    if (assignedColumn === -1) {
      assignedColumn = columns.length;
      columns.push([]);
    }

    columns[assignedColumn].push(event);
    event.column = assignedColumn;
    event.totalColumns = columns.length;
  });

  return sortedEvents;
};

export const calculateVisualEvents = (events: Event[]): VisualEvent[] => {
  const visualEvents: VisualEvent[] = events.map(
    (event: Event, index: number) => {
      if (!event.event_start || !event.event_end) {
        return {
          ...event,
          time: {
            start: {
              hours: 8,
              minutes: 0,
            },
            end: {
              hours: 9,
              minutes: 0,
            },
          },
          color: EVENT_COLORS[index % EVENT_COLORS.length],
          column: 0,
          totalColumns: 1,
          width: 100,
          left: 0,
        };
      }

      const startHour = event.event_start.getHours();
      const startMinutes = event.event_start.getMinutes();
      const endHour = event.event_end.getHours();
      const endMinutes = event.event_end.getMinutes();

      return {
        ...event,
        time: {
          start: {
            hours: startHour,
            minutes: startMinutes,
          },
          end: {
            hours: endHour,
            minutes: endMinutes,
          },
        },
        color: EVENT_COLORS[index % EVENT_COLORS.length],
        column: 0,
        totalColumns: 1,
        width: 100,
        left: 0,
      };
    }
  );

  const eventsWithColumns = assignEventColumns(visualEvents);

  return eventsWithColumns.map((event) => {
    const maxColumns = Math.max(
      ...eventsWithColumns.map((e) => e.totalColumns)
    );
    event.totalColumns = maxColumns;

    const maxAllowedColumns = 4;
    const actualColumns = Math.min(maxColumns, maxAllowedColumns);
    const minWidth = 25;

    event.width = Math.max(100 / actualColumns, minWidth);
    event.left = event.column * event.width;

    return event;
  });
};

export const getEventHeight = (event: VisualEvent): number => {
  const hoursDiff = event.time.end.hours - event.time.start.hours;
  const minutesDiff = event.time.end.minutes - event.time.start.minutes;
  return hoursDiff * 80 + minutesDiff - 8;
};

export const getEventTop = (event: VisualEvent): number => {
  const startHourOffset = event.time.start.hours - 8;
  const startMinutesOffset = event.time.start.minutes;
  return startHourOffset * 80 + startMinutesOffset + 4;
};
