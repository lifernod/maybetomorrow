<script lang="ts">
  import { Room } from "$lib/types";
  import { User } from "$lib/types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let rooms = $state<Room[]>([]);
  let isLoading = $state(true);
  let error = $state("");

  onMount(async () => {
    try {
      const currentUser = User.getCurrentUser();
      if (currentUser) {
        rooms = await Room.getRoomsByOwnerUsername(currentUser);
      }
    } catch (err) {
      error = "Ошибка загрузки комнат";
      console.error(err);
    } finally {
      isLoading = false;
    }
  });

  const createNewRoom = () => {
    goto("/home");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
</script>

<svelte:head>
  <title>Мои комнаты | maybetomorrow</title>
</svelte:head>

<div class="max-w-6xl mx-auto p-6">
  <div class="flex justify-between items-center mb-8">
    <h1 class="text-2xl font-alternates font-semibold">Мои комнаты</h1>
    <button onclick={createNewRoom} class="btn btn-primary px-6 py-2">
      + Создать новую комнату
    </button>
  </div>

  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  {:else if error}
    <div class="text-center py-12">
      <h2 class="text-xl text-red-600 mb-4">{error}</h2>
      <button onclick={() => window.location.reload()} class="btn btn-primary">
        Попробовать снова
      </button>
    </div>
  {:else if rooms.length === 0}
    <div class="text-center py-16 bg-white rounded-lg shadow">
      <div class="text-gray-400 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h2 class="text-xl font-medium text-gray-900 mb-2">
        У вас еще нет комнат
      </h2>
      <p class="text-gray-600 mb-6">
        Создайте свою первую комнату для совместного планирования
      </p>
      <button onclick={createNewRoom} class="btn btn-primary px-8">
        Создать комнату
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each rooms as room}
        <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-alternates font-semibold text-lg truncate">
                {room.room_id.substring(0, 8)}...
              </h3>
              <span
                class="text-xs px-2 py-1 rounded-full bg-primary bg-opacity-10 text-primary"
              >
                {room.username.length} участников
              </span>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center text-sm">
                <span class="text-gray-500 w-24">Владелец:</span>
                <span class="font-medium">{room.owner_username}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-gray-500 w-24">Дни:</span>
                <span class="font-medium">{room.day_number.join(", ")}</span>
              </div>
              <div class="flex items-center text-sm">
                <span class="text-gray-500 w-24">Месяц:</span>
                <span class="font-medium">{room.month_number.join(", ")}</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                onclick={() => goto(`/room/${room.room_id}`)}
                class="btn btn-primary flex-1"
              >
                Открыть
              </button>
              <button
                onclick={() => {
                  navigator.clipboard.writeText(Room.generateInviteLink(room.room_id));
                  alert("Ссылка скопирована!");
                }}
                class="btn btn-gray px-3"
                title="Копировать ссылку"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>