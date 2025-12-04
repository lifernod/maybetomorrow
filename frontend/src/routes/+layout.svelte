<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/components/shared/Header.svelte";
  import Footer from "$lib/components/shared/Footer.svelte";
  import { setUserContext } from "$lib/context/user";
  import { onMount } from "svelte";

  let { children } = $props();

  onMount(() => {
    // В реальном приложении здесь нужно получить пользователя из куки/сессии
    // Для демо устанавливаем mock пользователя
    setUserContext({
      username: "demo_user",
      userId: "demo_id",
      isAuthenticated: true,
    });
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
<Footer />