<script lang="ts">
  import MonthHeader from "$lib/components/month/MonthHeader.svelte";
  import MonthTableHead from "$lib/components/month/MonthTableHead.svelte";
  import MonthTableBody from "$lib/components/month/MonthTableBody.svelte";
  import MobileMonthHeader from "$lib/components/month/mobile/MobileMonthHeader.svelte";
  import MobileMonth from "$lib/components/month/mobile/MobileMonth.svelte";

  let { data } = $props();

  let viewportWidth = $state(1024);
  let selectedDays = $state<number[]>([]); // Состояние для выбранных дней
  
  // Функция для обновления selectedDays
  const updateSelectedDays = (days: number[]) => {
    selectedDays = days;
    console.log('Выбраны дни:', days); // Для отладки
  };
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<svelte:head>
  <title>Мой месяц | maybetomorrow</title>
</svelte:head>

<section class="mt-8 flex flex-col items-center">
  {#if viewportWidth > 800}
    <MonthHeader 
      monthInfo={data.month.monthInfo} 
      selectedDays={selectedDays} 
    />
    <table class="w-1/2">
      <MonthTableHead />
      <!-- Теперь onSelectedDaysChange должен работать -->
      <MonthTableBody 
        days={data.month.days} 
        monthNumber={data.month.monthInfo.monthNumber}
        onSelectedDaysChange={updateSelectedDays}
      />
    </table>
  {:else}
    <div>
      <MobileMonthHeader monthInfo={data.month.monthInfo} />
      <MobileMonth days={data.month.days} />
    </div>
  {/if}
</section>