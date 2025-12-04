<script lang="ts">
  import { Room } from "$lib/types";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let roomId = $state("");
  let isLoading = $state(false);
  let error = $state("");

  onMount(() => {
    // Проверяем, есть ли roomId в URL параметрах
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("roomId");
    if (idFromUrl) {
      roomId = idFromUrl;
    }
  });

  const joinRoom = async () => {
    if (!roomId.trim()) {
      error = "Введите ID комнаты";
      return;
    }

    isLoading = true;
    error = "";

    try {
      const room = await Room.joinRoom(roomId);
      await goto(`/room/${room.room_id}`);
    } catch (err) {
      error = "Не удалось присоединиться к комнате. Проверьте ID комнаты.";
      console.error(err);
    } finally {
      isLoading = false;
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      roomId = text.trim();
    } catch (err) {
      error = "Не удалось прочитать буфер обмена";
    }
  };
</script>

<svelte:head>
  <title>Присоединиться к комнате | maybetomorrow</title>
</svelte:head>

<div class="max-w-md mx-auto mt-20 p-6">
  <div class="bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-2xl font-alternates font-semibold text-center mb-2">
      Присоединиться к комнате
    </h1>
    
    <p class="text-gray-600 text-center mb-8">
      Введите ID комнаты, чтобы присоединиться к совместному расписанию
    </p>

    {#if error}
      <div class="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    {/if}

    <div class="space-y-4">
      <div>
        <label for="roomIdInput" class="block text-sm font-medium text-gray-700 mb-1">
          ID комнаты
        </label>
        <div class="flex gap-2">
          <input
            id = "roomIdInput"
            bind:value={roomId}
            type="text"
            placeholder="Введите ID комнаты"
            class="input flex-1"
          />
          <button
            onclick={handlePaste}
            type="button"
            class="btn btn-gray whitespace-nowrap"
          >
            Вставить
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          ID комнаты можно получить от создателя комнаты
        </p>
      </div>

      <div class="pt-4">
        <button
          onclick={joinRoom}
          disabled={isLoading || !roomId.trim()}
          class="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isLoading}
            <div class="flex items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              Присоединение...
            </div>
          {:else}
            Присоединиться к комнате
          {/if}
        </button>
      </div>

      <div class="text-center pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">
          Нет ID комнаты?{" "}
          <a href="/home" class="text-primary hover:underline">
            Создайте свою комнату
          </a>
        </p>
      </div>
    </div>
  </div>

  <!-- Инструкция -->
  <div class="mt-6 bg-blue-50 rounded-lg p-6">
    <h2 class="font-medium text-lg mb-3">Как это работает?</h2>
    <ul class="space-y-2 text-gray-700">
      <li class="flex items-start">
        <span class="text-primary mr-2">1.</span>
        <span>Создатель комнаты выбирает дни и приглашает участников</span>
      </li>
      <li class="flex items-start">
        <span class="text-primary mr-2">2.</span>
        <span>Каждый участник добавляет свои события в выбранные дни</span>
      </li>
      <li class="flex items-start">
        <span class="text-primary mr-2">3.</span>
        <span>Система автоматически находит удобные временные слоты для всех</span>
      </li>
      <li class="flex items-start">
        <span class="text-primary mr-2">4.</span>
        <span>Вы можете видеть расписания всех участников в одном окне</span>
      </li>
    </ul>
  </div>
</div>