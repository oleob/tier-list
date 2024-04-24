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
  <button class="secondary" on:click={tierStore.reset}>Nullstill</button>
  <button class="primary" on:click={tierStore.save}>Lagre</button>
</div>

<style>
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
</style>
