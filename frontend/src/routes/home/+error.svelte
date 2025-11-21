<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="flex h-screen w-full flex-col items-center justify-center">
	<h1 class="font-alternates text-3xl font-semibold">{page.status}</h1>
	<p>{page.error?.message}</p>

	<a href="/" class="btn btn-primary mt-5 w-32">Войти</a>
</section>
