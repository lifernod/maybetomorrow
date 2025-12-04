<script lang="ts">
  import type { MonthInfo } from '$lib/types';
  import CreateRoomButton from './CreateRoomButton.svelte';

  const dayTypes = [
    { name: 'Не назначено', bgCls: 'bg-table-undefined' },
    { name: 'Другой месяц', bgCls: 'bg-table-uneditable' },
    { name: 'Свободен', bgCls: 'bg-table-free' },
    { name: 'Занят', bgCls: 'bg-table-busy' }
  ] as const;

  const { monthInfo, selectedDays = [] }: {
    monthInfo: MonthInfo;
    selectedDays?: number[];
  } = $props();
</script>

<div class="flex flex-col items-center">
  <h1 class="mb-5 font-alternates text-lg font-medium">
    {monthInfo.monthName.long}
    {monthInfo.year}
  </h1>
  
  <!-- Добавляем кнопку создания комнаты -->
  <div class="mb-4">
    <CreateRoomButton {selectedDays} monthNumber={monthInfo.monthNumber} />
  </div>
  
  <!-- Подсказка про выбор дней -->
  {#if selectedDays && selectedDays.length > 0}
    <div class="mb-3 text-sm text-gray-600 bg-blue-50 p-2 rounded">
      Выбрано дней для комнаты: {selectedDays.length}
      <span class="text-xs text-gray-500 ml-2">
        (Ctrl+клик для выбора нескольких дней)
      </span>
    </div>
  {:else}
    <div class="mb-3 text-sm text-gray-600">
      <span class="text-xs text-gray-500">
        Ctrl+клик по дню для выбора нескольких дней
      </span>
    </div>
  {/if}
  
  <div class="mb-3 flex gap-8">
    {#each dayTypes as dayType}
      <div class="flex items-center gap-2">
        <div class={`h-6 w-6 ${dayType.bgCls}`}></div>
        <h1>{dayType.name}</h1>
      </div>
    {/each}
  </div>
</div>