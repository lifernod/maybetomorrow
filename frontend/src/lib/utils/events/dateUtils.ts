import { Month } from "$lib/types/month";

export type TimeSlot = {
  time: string;
  hour: number;
};

export const generateTimeSlots = (
  startHour: number = 8,
  endHour: number = 18
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, "0")}:00`,
      hour: hour,
    });
  }
  return slots;
};

export const getDayInfo = (day: {
  day_number: number;
  month_number: number;
}): string => {
  const monthInfo = Month.getMonthInfo(day.month_number);
  return `${day.day_number} ${monthInfo.monthName.not} ${monthInfo.year}`;
};

export const getEventTimeText = (event: {
  event_start?: Date;
  event_end?: Date;
}): string => {
  if (!event.event_start || !event.event_end) return "";

  const startTime = event.event_start.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = event.event_end.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${startTime} - ${endTime}`;
};
