<script lang="ts">
  let authType = $state<"signup" | "signin">("signin");
</script>

<div class="max-w-xs my-52 w-full mx-auto">
  {#if authType === "signin"}
    <form method="POST" action="?/login" class="flex flex-col gap-5">
      <h1 class="font-alternates text-xl text-center font-medium italic">
        С возвращением!
      </h1>
      <div>
        <label for="userId">имя пользователя</label>
        <input type="text" name="userId" class="w-full" />
      </div>

      <div>
        <label for="password">пароль</label>
        <input type="password" name="password" class="w-full" />
      </div>

      <button class="btn btn-primary w-full" type="submit"> Войти </button>
    </form>
  {:else}
    <form method="POST" action="?/signup" class="flex flex-col gap-5">
      <h1 class="font-alternates text-xl text-center font-medium italic">
        Добро пожаловать!
      </h1>
      <div>
        <label for="userId">имя пользователя</label>
        <input type="text" name="userId" class="w-full" />
      </div>

      <div>
        <label for="password">пароль</label>
        <input type="password" name="password" class="w-full" />
      </div>

      <div>
        <label for="spassword">повторите пароль</label>
        <input type="password" name="spassword" class="w-full" />
      </div>

      <button class="btn btn-primary w-full" type="submit">
        Создать аккаунт
      </button>
    </form>
  {/if}

  <section class="mt-8 flex items-center justify-center gap-2">
    <button class="header-link" onclick={() => (authType = "signin")}
      >Войти</button
    >
    <button class="header-link" onclick={() => (authType = "signup")}
      >Создать аккаунт</button
    >
  </section>
</div>
