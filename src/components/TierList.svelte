<script lang="ts">
  import { tiers } from "../constants.ts/tiers";
  import type { TierList, TierRow as TierRowType, Tiers } from "../types";
  import TierRow from "./TierRow.svelte";

  export let list: TierList;
  export let editable: boolean;
  $: tierlist = (Object.entries(list) as Array<[Tiers, TierRowType]>).sort(
    (a, b) => {
      const rankA = tiers[a[0]].rank;
      const rankB = tiers[b[0]].rank;
      return rankB - rankA;
    }
  );
</script>

<div>
  {#each tierlist as [tierName, tierRow]}
    <TierRow {tierName} {tierRow} {editable} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    flex: 1;
  }
</style>
