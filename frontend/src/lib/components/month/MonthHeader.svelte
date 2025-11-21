<script lang="ts">
	import type { MonthInfo } from '$lib/types';

	const dayTypes = [
		{ name: 'Не назначено', bgCls: 'bg-table-undefined' },
		{ name: 'Другой месяц', bgCls: 'bg-table-uneditable' },
		{ name: 'Свободен', bgCls: 'bg-table-free' },
		{ name: 'Занят', bgCls: 'bg-table-busy' }
	] as const;

	type Props = {
		monthInfo: MonthInfo;
	};

	const { monthInfo }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<h1 class="mb-5 font-alternates text-lg font-medium">
		{monthInfo.monthName.long}
		{monthInfo.year}
	</h1>
	<div class="mb-3 flex gap-8">
		{#each dayTypes as dayType}
			<div class="flex items-center gap-2">
				<div class={`h-6 w-6 ${dayType.bgCls}`}></div>
				<h1>{dayType.name}</h1>
			</div>
		{/each}
	</div>
</div>
