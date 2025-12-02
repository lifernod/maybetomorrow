export type Time = {
  hours: number;
  minutes: number;
};

export type TimeString = Time & { time: string };

export type EventTime = {
  start: Time;
  end: Time;
};

export const MIN_TIME: Time = { hours: 8, minutes: 0 };
export const MAX_TIME: Time = { hours: 18, minutes: 0 };

export const DEFAULT_START_TIME: Time = { hours: 8, minutes: 0 };
export const DEFAULT_END_TIME: Time = { hours: 9, minutes: 0 };

export const formatNumberTime = (hours: number, minutes = 0) => {
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

export const formatDateTime = (time: Date | undefined) => {
  if (!time) {
    return "00:00";
  }

  return time.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatStringTime = (time: string): Time => {
  const [hours, minutes] = time.split(":").map(Number);
  return {
    hours: hours,
    minutes,
  };
};

export const formatFullStringTime = (start: string, end: string): EventTime => {
  return {
    start: formatStringTime(start),
    end: formatStringTime(end),
  };
};

export const getEventTimeText = (event: {
  event_start?: Date;
  event_end?: Date;
}): string => {
  if (!event.event_start || !event.event_end) return "";

  const startTime = formatDateTime(event.event_start);
  const endTime = formatDateTime(event.event_end);

  return `${startTime} - ${endTime}`;
};
