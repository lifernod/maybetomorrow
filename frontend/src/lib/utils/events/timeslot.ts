import {
  MIN_TIME,
  MAX_TIME,
  type TimeString,
  formatNumberTime,
} from "./eventTime";

export const generateTimeSlots = (
  startTime = MIN_TIME,
  endTime = MAX_TIME
): TimeString[] => {
  const slots: TimeString[] = [];
  for (let hour = startTime.hours; hour <= endTime.hours; hour++) {
    slots.push({
      hours: hour,
      minutes: 0,
      time: formatNumberTime(hour),
    });
  }
  return slots;
};
