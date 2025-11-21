<script lang="ts">
	export const prerender = true;

	const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;
</script>

<tr>
	{#each weekDays as weekDay}
		<td class="h-10 w-10 border-2 border-table-border bg-table-border text-center font-medium">
			{weekDay}
		</td>
	{/each}
</tr>
