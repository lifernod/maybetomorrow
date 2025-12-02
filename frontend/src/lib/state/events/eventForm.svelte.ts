import { SvelteDate } from "svelte/reactivity";
import { generateTimeSlots } from "./timeslot";
import {
  DEFAULT_END_TIME,
  DEFAULT_START_TIME,
  type EventTime,
} from "./eventTime";
import type { EventEntity } from '$lib/entities/event/event_entity';

export const useEventForm = (onSave: (event: EventEntity) => void) => {
  const timeSlots = generateTimeSlots();

  const eventTime = $state<EventTime>({
    start: DEFAULT_START_TIME,
    end: DEFAULT_END_TIME,
  });

  const eventData = $state({
    name: "",
    description: "",
  });

  const saveEvent = () => {
    if (!eventData.name.trim()) return;

    const startDate = new SvelteDate();
    startDate.setHours(eventTime.start.hours, eventTime.start.minutes, 0, 0);

    const endDate = new SvelteDate();
    endDate.setHours(eventTime.end.hours, eventTime.end.minutes, 0, 0);

    if (endDate <= startDate) {
      alert("Время окончания должно быть позже времени начала");
      return;
    }

		const newEvent: EventEntity = {
			eventId: -1,
			eventName: eventData.name,
			eventDescription: eventData.description,
			startTime: startDate,
			endTime: endDate,
		};

    onSave(newEvent);
  };

  return {
    timeSlots,
    eventTime,
    eventData,

    saveEvent,
  };
};
