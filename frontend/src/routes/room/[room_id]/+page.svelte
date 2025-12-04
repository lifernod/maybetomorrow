<script lang="ts">
  import { Room } from "$lib/types";
  import { User } from "$lib/types";
  import { Day } from "$lib/types";
  import { Event } from "$lib/types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  
  let room = $state<Room | null>(null);
  let isLoading = $state(true);
  let error = $state("");
  
  // Для совмещения расписаний
  let combinedSchedule = $state<Map<string, Event[]>>(new Map()); // username -> events
  let selectedDay = $state<number>(1);
  let roomLink = $state("");

  onMount(async () => {
    try {
      const roomId = ($page.params as { roomId: string }).roomId;
      room = await Room.getRoomByRoomId(roomId);
      
      if (room) {
        roomLink = Room.generateInviteLink(room.room_id);
        // Загружаем расписания всех пользователей комнаты
        await loadUserSchedules();
      }
    } catch (err) {
      error = "Ошибка загрузки комнаты";
      console.error(err);
    } finally {
      isLoading = false;
    }
  });

  const loadUserSchedules = async () => {
    if (!room) return;

    for (const username of room.username) {
      try {
        // Здесь нужно реализовать загрузку событий пользователя за выбранный день
        // Пока используем mock данные
        combinedSchedule.set(username, []);
      } catch (err) {
        console.error(`Ошибка загрузки расписания пользователя ${username}:`, err);
      }
    }
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(roomLink);
      alert("Ссылка скопирована в буфер обмена!");
    } catch (err) {
      alert("Не удалось скопировать ссылку");
    }
  };

  const leaveRoom = async () => {
    if (room && confirm("Вы уверены, что хотите покинуть комнату?")) {
      try {
        // Предполагаем, что имя текущего пользователя доступно
        const currentUsername = "current_user"; // Заменить на реальное
        await Room.removeUserFromRoom(room.room_id, currentUsername);
        await goto("/home");
      } catch (err) {
        alert("Ошибка при выходе из комнаты");
      }
    }
  };
</script>

<svelte:head>
  <title>Комната | maybetomorrow</title>
</svelte:head>

{#if isLoading}
  <div class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
{:else if error}
  <div class="text-center mt-20">
    <h1 class="text-2xl font-alternates text-red-600 mb-4">{error}</h1>
    <button onclick={() => goto("/home")} class="btn btn-primary">
      Вернуться на главную
    </button>
  </div>
{:else if room}
  <div class="max-w-6xl mx-auto p-6">
    <!-- Header комнаты -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-alternates font-semibold text-gray-900">
            Комната: {room.room_id.substring(0, 8)}...
          </h1>
          <p class="text-gray-600 mt-2">
            Владелец: <span class="font-medium">{room.owner_username}</span>
          </p>
          <p class="text-gray-600">
            Участников: <span class="font-medium">{room.username.length}</span>
          </p>
          <p class="text-gray-600">
            Дни: <span class="font-medium">{room.day_number.join(", ")}</span>
          </p>
        </div>

        <div class="space-y-3">
          <button
            onclick={copyInviteLink}
            class="btn btn-primary px-4 py-2 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Копировать ссылку
          </button>
          
          <button
            onclick={leaveRoom}
            class="btn btn-gray px-4 py-2 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"
              />
            </svg>
            Покинуть комнату
          </button>
        </div>
      </div>

      <!-- Ссылка для приглашения -->
      <div class="mt-4 p-3 bg-gray-100 rounded-lg">
        <p class="text-sm font-medium text-gray-700 mb-1">Ссылка для приглашения:</p>
        <div class="flex gap-2">
          <input
            type="text"
            value={roomLink}
            readonly
            class="input bg-white flex-1"
          />
          <button
            onclick={copyInviteLink}
            class="btn btn-primary whitespace-nowrap"
          >
            Копировать
          </button>
        </div>
      </div>
    </div>

    <!-- Выбор дня для просмотра -->
    <div class="mb-6">
      <h2 class="text-xl font-alternates font-semibold mb-3">
        Выберите день для совмещения расписаний
      </h2>
      <div class="flex flex-wrap gap-2">
        {#each room.day_number as dayNum}
          <button
            onclick={() => (selectedDay = dayNum)}
            class={{
              "px-4 py-2 rounded-lg border transition-colors": true,
              "bg-primary text-white border-primary": selectedDay === dayNum,
              "bg-white text-gray-700 border-gray-300 hover:border-primary": selectedDay !== dayNum,
            }}
          >
            День {dayNum}
          </button>
        {/each}
      </div>
    </div>

    <!-- Совмещенные расписания -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-alternates font-semibold mb-6">
        Совмещенные расписания на день {selectedDay}
      </h2>

      {#if combinedSchedule.size === 0}
        <div class="text-center py-12 text-gray-500">
          <p>Нет данных о расписаниях участников</p>
          <p class="text-sm mt-2">Попросите участников добавить события в этот день</p>
        </div>
      {:else}
        <div class="space-y-6">
          {#each Array.from(combinedSchedule.entries()) as [username, events]}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-lg text-gray-900">
                  {username}
                  {#if username === room.owner_username}
                    <span class="ml-2 text-xs bg-primary text-white px-2 py-1 rounded">
                      Владелец
                    </span>
                  {/if}
                </h3>
                <span class="text-sm text-gray-500">
                  {events.length} событий
                </span>
              </div>

              {#if events.length === 0}
                <p class="text-gray-500 italic">Нет событий в этот день</p>
              {:else}
                <div class="space-y-2">
                  {#each events as event}
                    <div class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                      <div class="flex justify-between">
                        <h4 class="font-medium text-gray-900">{event.event_name}</h4>
                        <span class="text-sm text-gray-600">
                          {event.event_start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {event.event_end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {#if event.event_description}
                        <p class="text-sm text-gray-600 mt-1">{event.event_description}</p>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>

        <!-- Визуализация совмещения времен -->
        <div class="mt-8">
          <h3 class="text-lg font-medium mb-4">Временная шкала совмещения</h3>
          <div class="relative h-96 border border-gray-300 rounded-lg p-4">
            <!-- Здесь будет визуализация совмещения событий всех пользователей -->
            <div class="text-center text-gray-500 py-20">
              Визуализация совмещения расписаний в разработке
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Список участников -->
    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-alternates font-semibold mb-4">Участники комнаты</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each room.username as user}
          <div class="flex items-center p-3 border border-gray-200 rounded-lg">
            <div class="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center font-medium mr-3">
              {user.charAt(0).toUpperCase()}
            </div>
            <div>
              <p class="font-medium">{user}</p>
              {#if user === room.owner_username}
                <p class="text-xs text-primary">Владелец</p>
              {:else}
                <p class="text-xs text-gray-500">Участник</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}