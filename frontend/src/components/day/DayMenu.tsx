import { Day } from "$lib/types/day";
import { Event } from "$lib/types/event";
import { For, createSignal, createEffect, Show } from "solid-js";
import { createStore } from "solid-js/store";

type DayMenuProps = {
  day: Day;
  events: Event[];
  onCreateEvent: (event: Partial<Event>[]) => void;
  onClose: () => void;
};

type TimeSlot = {
  time: string;
  hour: number;
};

type VisualEvent = Event & {
  startHour: number;
  endHour: number;
  startMinutes: number;
  endMinutes: number;
  color: string;
  column: number;
  totalColumns: number;
  width: number;
  left: number;
};

// Генерация временных слотов с 8:00 до 18:00 с шагом в 1 час
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      hour: hour,
    });
  }
  return slots;
};

// Цвета для событий
const EVENT_COLORS = [
  "bg-blue-100 border-blue-300 text-blue-800",
  "bg-green-100 border-green-300 text-green-800",
  "bg-purple-100 border-purple-300 text-purple-800",
  "bg-yellow-100 border-yellow-300 text-yellow-800",
  "bg-pink-100 border-pink-300 text-pink-800",
  "bg-indigo-100 border-indigo-300 text-indigo-800",
  "bg-red-100 border-red-300 text-red-800",
  "bg-teal-100 border-teal-300 text-teal-800",
  "bg-lime-100 border-lime-300 text-lime-800",
  "bg-rose-100 border-rose-300 text-rose-800"
];

// Функция для проверки пересечения событий
const eventsOverlap = (event1: VisualEvent, event2: VisualEvent): boolean => {
  return !(event1.endHour < event2.startHour || event2.endHour < event1.startHour);
};

// Функция для распределения событий по колонкам
const assignEventColumns = (events: VisualEvent[]): VisualEvent[] => {
  const sortedEvents = [...events].sort((a, b) => a.startHour - b.startHour);
  const columns: VisualEvent[][] = [];
  
  sortedEvents.forEach(event => {
    let assignedColumn = -1;
    
    // Ищем первую доступную колонку
    for (let i = 0; i < columns.length; i++) {
      const columnEvents = columns[i];
      const canPlaceInColumn = !columnEvents.some(existingEvent => 
        eventsOverlap(event, existingEvent)
      );
      
      if (canPlaceInColumn) {
        assignedColumn = i;
        break;
      }
    }
    
    // Если не нашли доступную колонку, создаем новую
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

// Функция для расчета визуального представления событий
const calculateVisualEvents = (events: Event[]): VisualEvent[] => {
  const visualEvents: VisualEvent[] = events.map((event: Event, index: number) => {
    if (!event.event_start || !event.event_end) {
      return {
        ...event,
        startHour: 8,
        endHour: 9,
        startMinutes: 0,
        endMinutes: 0,
        color: EVENT_COLORS[index % EVENT_COLORS.length],
        column: 0,
        totalColumns: 1,
        width: 100,
        left: 0
      };
    }

    const startHour = event.event_start.getHours();
    const startMinutes = event.event_start.getMinutes();
    const endHour = event.event_end.getHours();
    const endMinutes = event.event_end.getMinutes();

    return {
      ...event,
      startHour,
      endHour,
      startMinutes,
      endMinutes,
      color: EVENT_COLORS[index % EVENT_COLORS.length],
      column: 0,
      totalColumns: 1,
      width: 100,
      left: 0
    };
  });

  // Распределяем события по колонкам
  const eventsWithColumns = assignEventColumns(visualEvents);
  
  // Рассчитываем ширину и позицию для каждого события
  return eventsWithColumns.map(event => {
    const maxColumns = Math.max(...eventsWithColumns.map(e => e.totalColumns));
    event.totalColumns = maxColumns;
    
    // Ограничиваем минимальную ширину и максимальное количество колонок
    const maxAllowedColumns = 4;
    const actualColumns = Math.min(maxColumns, maxAllowedColumns);
    const minWidth = 25;
    
    event.width = Math.max(100 / actualColumns, minWidth);
    event.left = event.column * event.width;
    
    return event;
  });
};

export default function DayMenu(props: DayMenuProps) {
  const dayInfo = props.day.getDayInfo();
  
  const [newEvents, setNewEvents] = createStore<Partial<Event>[]>([]);
  const [baseTimeSlots] = createStore<TimeSlot[]>(generateTimeSlots());
  const [visualEvents, setVisualEvents] = createStore<VisualEvent[]>([]);
  const [isAddingEvent, setIsAddingEvent] = createSignal(false);
  const [newEventTime, setNewEventTime] = createSignal("08:00");
  const [newEventEndTime, setNewEventEndTime] = createSignal("09:00");
  const [newEventData, setNewEventData] = createStore({
    name: "",
    description: ""
  });

  // Обновляем визуализацию при изменении событий
  createEffect(() => {
    const allEvents: Event[] = [...props.events, ...newEvents as Event[]];
    const visualEventsData = calculateVisualEvents(allEvents);
    setVisualEvents(visualEventsData);
  });

  const createEmptyEvent = () => {
    setIsAddingEvent(true);
  };

  const saveNewEvent = () => {
    if (!newEventData.name.trim()) return;

    // Создаем Date объекты для начала и конца события
    const [startHours, startMinutes] = newEventTime().split(':').map(Number);
    const [endHours, endMinutes] = newEventEndTime().split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);
    
    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    // Проверяем, что время окончания позже времени начала
    if (endDate <= startDate) {
      alert("Время окончания должно быть позже времени начала");
      return;
    }

    const newEvent: Partial<Event> = {
      event_name: newEventData.name,
      event_description: newEventData.description,
      event_start: startDate,
      event_end: endDate,
      event_id: -Math.floor(Math.random() * 10000)
    };

    setNewEvents([...newEvents, newEvent]);
    setIsAddingEvent(false);
    setNewEventData({ name: "", description: "" });
    setNewEventTime("08:00");
    setNewEventEndTime("09:00");
  };

  const cancelNewEvent = () => {
    setIsAddingEvent(false);
    setNewEventData({ name: "", description: "" });
    setNewEventTime("08:00");
    setNewEventEndTime("09:00");
  };

  const handleSaveAll = () => {
    if (newEvents.length > 0) {
      props.onCreateEvent(newEvents);
    }
    props.onClose();
  };

  const removeNewEvent = (eventId: number) => {
    setNewEvents(newEvents.filter(event => event.event_id !== eventId));
  };

  // Функция для форматирования времени события
  const getEventTimeText = (event: Event) => {
    if (!event.event_start || !event.event_end) return "";
    
    const startTime = event.event_start.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const endTime = event.event_end.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return `${startTime} - ${endTime}`;
  };

  // Функция для получения высоты события в пикселях
  const getEventHeight = (event: VisualEvent) => {
    const hoursDiff = event.endHour - event.startHour;
    const minutesDiff = event.endMinutes - event.startMinutes;
    const totalMinutes = hoursDiff * 80 + minutesDiff;
    
    // 80px на час, 1.33px на минуту
    return (hoursDiff * 80) + minutesDiff - 8; // Вычитаем отступы
  };

  // Функция для получения отступа сверху для события
  const getEventTop = (event: VisualEvent) => {
    const startHourOffset = event.startHour - 8; // Смещение от 8:00 в часах
    const startMinutesOffset = event.startMinutes;
    
    // 80px на час, 1.33px на минуту
    return (startHourOffset * 80) + startMinutesOffset + 4; // +4 для отступа
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Заголовок */}
        <div class="bg-primary text-white p-6">
          <h1 class="text-2xl font-alternates font-semibold text-center">
            {dayInfo}
          </h1>
        </div>

        {/* Контент */}
        <div class="p-6 max-h-[60vh] overflow-y-auto">
          {/* Временная шкала с абсолютным позиционированием событий */}
          <div class="relative">
            {/* Список временных слотов */}
            <div class="space-y-1">
              <For each={baseTimeSlots}>
                {(slot) => (
                  <div class="flex items-start gap-4 py-2 min-h-[60px] border-b border-gray-100 relative">
                    {/* Время */}
                    <div class="w-16 flex-shrink-0 pt-1">
                      <span class="text-sm font-medium text-gray-600">
                        {slot.time}
                      </span>
                    </div>
                    
                    {/* Область для событий */}
                    <div class="flex-1 min-w-0 h-[60px] relative border border-transparent rounded-lg">
                      {/* Пустая область для отображения событий */}
                    </div>
                  </div>
                )}
              </For>
            </div>

            {/* Абсолютно позиционированные события */}
            <For each={visualEvents}>
              {(event) => (
                <div 
                  class={`absolute border-l-4 rounded-lg p-2 shadow-sm ${event.color} border-l-4 overflow-hidden`}
                  style={{
                    top: `${getEventTop(event)}px`,
                    height: `${getEventHeight(event)}px`,
                    left: `calc(4rem + ${event.left}% + 8px)`,
                    width: `calc(${event.width}% - 16px)`,
                    'z-index': '10',
                    'max-width': `calc(100% - 4rem - 16px)`
                  }}
                >
                  <h3 class="font-medium text-xs mb-1 leading-tight break-words">
                    {event.event_name}
                  </h3>
                  {event.event_description && (
                    <p class="text-xs text-opacity-80 mb-1 line-clamp-1 leading-tight break-words">
                      {event.event_description}
                    </p>
                  )}
                  <p class="text-xs text-opacity-60 leading-tight break-words">
                    {getEventTimeText(event)}
                  </p>
                </div>
              )}
            </For>
          </div>

          {/* Кнопка добавления события внизу временной шкалы */}
          <div class="mt-6 flex justify-center">
            <button
              onClick={createEmptyEvent}
              class="flex items-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary hover:bg-gray-50 transition-colors"
            >
              <span class="text-lg">+</span>
              <span class="font-medium">Добавить событие</span>
            </button>
          </div>

          {/* Форма добавления нового события */}
          <Show when={isAddingEvent()}>
            <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 class="font-medium text-gray-900 mb-3">Новое событие</h3>
              
              <div class="space-y-3">
                {/* Время начала */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Время начала
                  </label>
                  <select 
                    value={newEventTime()}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    class="input w-full"
                  >
                    <For each={baseTimeSlots}>
                      {(slot) => (
                        <option value={slot.time}>{slot.time}</option>
                      )}
                    </For>
                  </select>
                </div>

                {/* Время окончания */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Время окончания
                  </label>
                  <select 
                    value={newEventEndTime()}
                    onChange={(e) => setNewEventEndTime(e.target.value)}
                    class="input w-full"
                  >
                    <For each={baseTimeSlots}>
                      {(slot) => (
                        <option 
                          value={slot.time}
                          disabled={slot.hour <= parseInt(newEventTime().split(':')[0])}
                        >
                          {slot.time}
                        </option>
                      )}
                    </For>
                  </select>
                </div>

                {/* Название события */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Название события
                  </label>
                  <input
                    type="text"
                    value={newEventData.name}
                    onInput={(e) => setNewEventData("name", e.target.value)}
                    placeholder="Введите название события"
                    class="input w-full"
                  />
                </div>

                {/* Описание */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <textarea
                    value={newEventData.description}
                    onInput={(e) => setNewEventData("description", e.target.value)}
                    placeholder="Добавьте описание (необязательно)"
                    rows={2}
                    class="input w-full resize-none"
                  />
                </div>

                {/* Кнопки */}
                <div class="flex gap-3 pt-2">
                  <button
                    onClick={saveNewEvent}
                    disabled={!newEventData.name.trim()}
                    class="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={cancelNewEvent}
                    class="btn btn-gray flex-1"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </Show>

          {/* Список новых событий */}
          <Show when={newEvents.length > 0}>
            <div class="mt-6">
              <h3 class="font-medium text-gray-900 mb-3">Новые события</h3>
              <div class="space-y-2">
                <For each={newEvents}>
                  {(event) => (
                    <div class="bg-gray-100 rounded-lg p-3 border-l-4 border-green-500">
                      <div class="flex justify-between items-start">
                        <div class="flex-1">
                          <h4 class="font-medium text-gray-900">
                            {event.event_name}
                          </h4>
                          {event.event_description && (
                            <p class="text-sm text-gray-600 mt-1">
                              {event.event_description}
                            </p>
                          )}
                          <p class="text-xs text-gray-500 mt-1">
                            {event.event_start?.toLocaleTimeString('ru-RU', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} - {event.event_end?.toLocaleTimeString('ru-RU', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => event.event_id && removeNewEvent(event.event_id!)}
                          class="text-red-500 hover:text-red-700 text-sm"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>
        </div>

        {/* Футер с кнопками */}
        <div class="border-t border-gray-200 p-6 bg-gray-50">
          <div class="flex gap-3">
            <button
              onClick={handleSaveAll}
              class="btn btn-primary flex-1"
            >
              Сохранить все изменения
            </button>
            <button
              onClick={props.onClose}
              class="btn btn-gray flex-1"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}