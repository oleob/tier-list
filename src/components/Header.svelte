<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<header>
  <a use:link use:active href="/">Din liste</a>
  <a use:link use:active href="/all"> Alle lister</a>
  <a use:link use:active href="/summary">Standings</a>
</header>

<style>
  a {
    text-decoration: none;
  }
  a:global(.active) {
    color: red;
  }
</style>
