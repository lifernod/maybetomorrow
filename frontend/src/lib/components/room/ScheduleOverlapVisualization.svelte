<script lang="ts">
  import { Event } from "$lib/types";
  import { formatDateTime } from "$lib/utils/events/eventTime";

  type UserSchedule = {
    username: string;
    color: string;
    events: Event[];
  };

  export let schedules: UserSchedule[] = [];
  
  // Временные слоты для дня
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 - 19:00
  
  // Преобразуем события в позиции на временной шкале
  const getEventPosition = (event: Event) => {
    const startHour = event.event_start?.getHours() || 8;
    const startMinute = event.event_start?.getMinutes() || 0;
    const endHour = event.event_end?.getHours() || 9;
    const endMinute = event.event_end?.getMinutes() || 0;
    
    const startPosition = (startHour - 8) * 60 + startMinute;
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
    
    return {
      top: (startPosition / 60) * 80, // 80px в час
      height: (duration / 60) * 80,
    };
  };
  
  // Находим пересечения событий
  const findOverlaps = () => {
    const overlaps: Array<{
      time: string;
      users: string[];
      events: Event[];
    }> = [];
    
    // Упрощенная логика поиска пересечений
    // В реальном приложении нужно более сложное сравнение
    
    return overlaps;
  };
  
  const overlaps = findOverlaps();
</script>

<div class="relative border border-gray-300 rounded-lg p-4 min-h-[500px]">
  <!-- Легенда -->
  <div class="flex flex-wrap gap-3 mb-4">
    {#each schedules as schedule}
      <div class="flex items-center">
        <div
          class="w-4 h-4 rounded mr-2"
          style="background-color: {schedule.color}"
        ></div>
        <span class="text-sm">{schedule.username}</span>
      </div>
    {/each}
  </div>
  
  <!-- Временная шкала -->
  <div class="flex">
    <!-- Временные метки -->
    <div class="w-16 shrink-0">
      {#each timeSlots as hour}
        <div class="h-20 flex items-start justify-end pr-2 border-b border-gray-200">
          <span class="text-sm text-gray-600">{hour}:00</span>
        </div>
      {/each}
    </div>
    
    <!-- Область событий -->
    <div class="flex-1 relative">
      <!-- Сетка часов -->
      {#each timeSlots as hour}
        <div class="h-20 border-b border-gray-200"></div>
      {/each}
      
      <!-- События пользователей -->
      {#each schedules as schedule}
        {#each schedule.events as event}
          {#if event.event_start && event.event_end}
            <div
              class="absolute rounded p-2 border-l-4 opacity-80 hover:opacity-100 transition-opacity"
              style="
                background-color: {schedule.color}33;
                border-color: {schedule.color};
                top: {getEventPosition(event).top}px;
                height: {getEventPosition(event).height}px;
                left: 0;
                right: 0;
                margin: 0 4px;
              "
              title="{event.event_name} ({schedule.username})"
            >
              <div class="font-medium text-sm truncate">{event.event_name}</div>
              <div class="text-xs opacity-75">
                {formatDateTime(event.event_start)} - {formatDateTime(event.event_end)}
              </div>
            </div>
          {/if}
        {/each}
      {/each}
      
      <!-- Области пересечений -->
      {#each overlaps as overlap}
        <div
          class="absolute bg-yellow-200 border border-yellow-400 rounded opacity-70"
          style="
            top: {getEventPosition(overlap.events[0]).top}px;
            height: {getEventPosition(overlap.events[0]).height}px;
            left: 0;
            right: 0;
            margin: 0 4px;
          "
          title="Пересечение: {overlap.users.join(', ')}"
        >
          <div class="p-1 text-xs font-medium text-yellow-800">
            ⚠ Пересечение ({overlap.users.length} пользователей)
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Подсказка -->
  <div class="mt-4 text-sm text-gray-600">
    <p>Цветные блоки - события пользователей. Желтые области - пересечения расписаний.</p>
  </div>
</div>