<script lang="ts">
	import "../layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import type { LayoutProps } from './$types';
	import MonthPageHeader from '$lib/components/month/MonthPageHeader.svelte';
	import MonthTableHead from '$lib/components/month/MonthTableHead.svelte';

	let { children, data }: LayoutProps = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<MonthPageHeader monthNumber={data.month.monthNumber}/>
<main class="mt-8 flex flex-col items-center">
	<table>
		<MonthTableHead />
		{@render children()}
	</table>
</main>

