<script lang="ts">
	import MonthHeader from '$lib/components/month/MonthHeader.svelte';
	import MonthTableHead from '$lib/components/month/MonthTableHead.svelte';
	import MonthTableBody from '$lib/components/month/MonthTableBody.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Мой месяц | maybetomorrow</title>
</svelte:head>

<section class="mt-8 flex flex-col items-center">
	<MonthHeader monthInfo={data.month.monthInfo} />
	<table class="w-1/2">
		<MonthTableHead />
		<MonthTableBody days={data.month.days} />
	</table>
</section>
