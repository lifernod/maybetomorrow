<script lang="ts">
	import { page } from "$app/state";
</script>

<section class="flex mt-24 flex-col items-center justify-center">
	<h1 class="font-alternates text-3xl font-semibold">{page.status}</h1>
	<p>{page.error?.message}</p>

	{#if page.status === 403}
		<!-- Unauthorized -->
		<a href="/" class="btn btn-primary mt-5 w-32">Войти</a>
	{:else}
		<h2>Пожалуйста, обновите страницу</h2>
	{/if}
</section>
