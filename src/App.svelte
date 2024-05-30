<script lang="ts">
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Router from "svelte-spa-router";
  import { userStore } from "./stores/userStore";
  import { routes } from "./constants.ts/routes";
</script>

<Header />
<main>
  {#if $userStore.loaded}
    <Router {routes} />
  {:else}
    <h1>Autentiserer...</h1>
  {/if}
</main>
<Footer />

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  h1 {
    text-align: center;
  }
</style>
