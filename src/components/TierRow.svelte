<script lang="ts">
  import { tiers } from "../constants.ts/tiers";
  import { changeTier } from "../stores/tierStore";
  import type { TierRow, Tiers } from "../types";
  import TierEntry from "./TierEntry.svelte";
  export let tierName: Tiers;
  export let tierRow: TierRow;
  export let editable: boolean;

  const onDrop = (event: DragEvent) => {
    const id = event.dataTransfer?.getData("id");
    const fromTier = event.dataTransfer?.getData("tier") as Tiers | undefined;
    if (id && fromTier) {
      changeTier(id, fromTier, tierName);
    }
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  data-tier={tierName}
  class="container"
  on:dragover|preventDefault
  on:drop={onDrop}
  draggable="false"
>
  <div class="label" style="--bg-color: {tiers[tierName].color};">
    <h2>{tierName}</h2>
  </div>
  <ul>
    {#each tierRow.entries as entry (entry.id)}
      <TierEntry {entry} tier={tierName} {editable} />
    {/each}
  </ul>
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
  }
  .container:last-of-type {
    border-bottom: none;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    min-width: 5rem;
    min-height: 4rem;
    height: 100%;
    color: black;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
  }
</style>
