<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Аутентификация | maybetomorrow</title>
</svelte:head>

<main class="max-w-xs my-52 w-full mx-auto">
	{@render children()}

	<footer class="mt-8 flex items-center justify-center gap-2">
		<a class="header-link" href="/auth/signup">Регистрация</a>

		<a class="header-link" href="/auth/signin">Вход</a>
	</footer>
</main>
