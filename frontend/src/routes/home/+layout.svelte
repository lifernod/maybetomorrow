<script lang="ts">
	import "../layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<pre>
	{JSON.stringify(data.month)}
</pre>
{@render children()}

