<script lang="ts">
  import { Room } from "$lib/types";
  import { User } from "$lib/types";
  import { goto } from "$app/navigation";

  // Используем $props() вместо export let
  const { selectedDays = [], monthNumber }: {
    selectedDays?: number[];
    monthNumber: number;
  } = $props();

  let showModal = $state(false);
  let roomName = $state("");
  let invitedUsers = $state<string[]>([""]);
  let isLoading = $state(false);
  let errorMessage = $state("");

  const addUserField = () => {
    invitedUsers = [...invitedUsers, ""];
  };

  const removeUserField = (index: number) => {
    if (invitedUsers.length > 1) {
      invitedUsers = invitedUsers.filter((_, i) => i !== index);
    } else {
      invitedUsers = [""];
    }
  };

  const updateUser = (index: number, value: string) => {
    invitedUsers = invitedUsers.map((user, i) => 
      i === index ? value.trim() : user
    );
  };

  const createRoom = async () => {
    if (!roomName.trim()) {
      errorMessage = "Введите название комнаты";
      return;
    }

    if (selectedDays.length === 0) {
      errorMessage = "Выберите хотя бы один день";
      return;
    }

    isLoading = true;
    errorMessage = "";

    try {
      // ФИКС: User.getCurrentUser() возвращает string | null
      const currentUser = User.getCurrentUser();
      const currentUsername = currentUser ? currentUser : "current_user";
      
      // Фильтруем пустые имена пользователей
      const validUsers = invitedUsers.filter(user => user.trim() !== "");
      
      const room = await Room.createRoom(
        selectedDays,
        Array(selectedDays.length).fill(monthNumber),
        currentUsername,
        validUsers
      );

      // Переходим на страницу комнаты
      await goto(`/room/${room.room_id}`);
      
      showModal = false;
    } catch (error) {
      errorMessage = "Ошибка при создании комнаты";
      console.error(error);
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="relative">
  <!-- Кнопка создания комнаты -->
  <button
    onclick={() => (showModal = true)}
    class="btn btn-primary px-6 py-2 rounded-lg flex items-center gap-2"
    aria-label="Создать комнату для совместного планирования"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        clip-rule="evenodd"
      />
    </svg>
    Создать комнату
  </button>

  <!-- Модальное окно создания комнаты -->
  {#if showModal}
    <!-- Overlay с role="presentation" -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onclick={() => (showModal = false)}
      onkeydown={(e) => e.key === 'Escape' && (showModal = false)}
      role="presentation"
      tabindex="-1"
    >
      <!-- Основной диалог -->
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabindex="-1"
      >
        <!-- Header -->
        <div class="bg-primary text-white p-6">
          <h1 
            id="modal-title"
            class="text-xl font-alternates font-semibold text-center"
          >
            Создать комнату
          </h1>
        </div>

        <!-- Content -->
        <div class="p-6 max-h-[60vh] overflow-y-auto">
          <div id="modal-description" class="sr-only">
            Форма для создания комнаты совместного планирования
          </div>
          
          {#if errorMessage}
            <div 
              class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              {errorMessage}
            </div>
          {/if}

          <form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
            <div>
              <label 
                for="roomName" 
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Название комнаты
              </label>
              <input
                id="roomName"
                bind:value={roomName}
                type="text"
                placeholder="Введите название комнаты"
                class="input w-full"
                aria-required="true"
                required
              />
            </div>

            <div>
              <p 
                id="selected-days-label"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Выбранные дни: {selectedDays.join(", ")}
              </p>
              <p class="text-sm text-gray-500">
                Для создания комнаты выберите дни в календаре (кликните на них)
              </p>
            </div>

            <fieldset>
              <legend class="block text-sm font-medium text-gray-700 mb-2">
                Пригласить пользователей
              </legend>
              
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">
                  Добавьте пользователей для совместного доступа
                </span>
                <button
                  type="button"
                  onclick={addUserField}
                  class="text-sm text-primary hover:text-primary-dark"
                  aria-label="Добавить поле для ввода пользователя"
                >
                  + Добавить
                </button>
              </div>

              <div class="space-y-2" role="list">
                {#each invitedUsers as user, index}
                  <div class="flex gap-2" role="listitem">
                    <label for={`user-${index}`} class="sr-only">
                      Имя пользователя {index + 1}
                    </label>
                    <input
                      id={`user-${index}`}
                      type="text"
                      value={user}
                      oninput={(e) => updateUser(index, (e.target as HTMLInputElement).value)}
                      placeholder="Имя пользователя"
                      class="input flex-1"
                    />
                    {#if invitedUsers.length > 1}
                      <button
                        type="button"
                        onclick={() => removeUserField(index)}
                        class="text-red-500 hover:text-red-700 p-2"
                        aria-label={`Удалить пользователя ${index + 1}`}
                      >
                        <span aria-hidden="true">×</span>
                        <span class="sr-only">Удалить</span>
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>
            </fieldset>
          </form>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 p-6 bg-gray-50">
          <div class="flex gap-3">
            <button
              onclick={createRoom}
              disabled={isLoading || selectedDays.length === 0}
              class="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={isLoading || selectedDays.length === 0}
            >
              {#if isLoading}
                <span aria-hidden="true">Создание...</span>
                <span class="sr-only">Идет создание комнаты</span>
              {:else}
                Создать комнату
              {/if}
            </button>
            <button
              onclick={() => (showModal = false)}
              class="btn btn-gray flex-1"
              aria-label="Отмена создания комнаты"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>