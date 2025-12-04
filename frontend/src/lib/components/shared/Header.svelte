<script lang="ts">
  import { User } from "$lib/types";
  
  let currentUser = $state<string | null>(null);
  
  // Проверяем авторизацию (в реальном приложении нужно получать из куки/сессии)
  $effect(() => {
    currentUser = User.getCurrentUser();
  });
</script>

<header class="my-5 flex flex-col items-center">
  <a class="font-alternates font-medium text-primary" href="/home">
    maybetomorrow
  </a>
  
  <!-- Навигация для авторизованных пользователей -->
  {#if currentUser}
    <nav class="mt-3 flex gap-4">
      <a href="/home" class="header-link">Мой месяц</a>
      <a href="/room/join" class="header-link">Присоединиться</a>
      <a href="/rooms" class="header-link">Мои комнаты</a>
    </nav>
  {/if}
</header>