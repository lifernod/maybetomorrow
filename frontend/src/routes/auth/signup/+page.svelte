<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="POST" class="flex flex-col gap-5">
	<h1 class="font-alternates text-xl text-center font-medium italic">
		Добро пожаловать!
	</h1>
	<div>
		<label for="username">имя пользователя</label>
		<input type="text" name="username" class="w-full" />
	</div>

	<div>
		<label for="password">пароль</label>
		<input type="password" name="password" class="w-full" />
	</div>

	<button class="btn btn-primary w-full" type="submit">
		Создать аккаунт
	</button>
</form>