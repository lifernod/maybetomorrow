<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Мой месяц | maybetomorrow</title>
</svelte:head>

<h1>Page: {data.a}</h1>
<h1>Hello</h1>