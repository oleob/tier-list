<script>
  import { onDestroy } from "svelte";
  import TierList from "../components/TierList.svelte";
  import { tierStore } from "../stores/tierStore";

  onDestroy(() => {
    tierStore.save();
  });
</script>

<TierList list={$tierStore} editable />
<div class="actions">
  <button on:click={tierStore.reset}>Nullstill</button>
  <button on:click={tierStore.save}>Lagre</button>
</div>

<style>
  .actions {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
</style>
