<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<header>
  <a use:link use:active href="/">Din liste</a>
  <a use:link use:active={"/all/*"} href="/all/"> Alle lister</a>
  <a use:link use:active href="/summary/">Standings</a>
  <a use:link use:active href="/teams/">Teams</a>
</header>

<style>
  header {
    display: flex;
    padding: 8px;
    background-color: var(--color-green);
    color: var(--color-grey);
  }

  a:global(.active) {
    background-color: var(--color-white);
  }
  a {
    display: block;
    padding: 0 8px;
    padding: 16px 8px;
    border-radius: 4px;
  }
</style>
