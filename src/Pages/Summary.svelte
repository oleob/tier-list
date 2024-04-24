<script lang="ts">
  import { onMount } from "svelte";
  import { allListsStore, type AllLists } from "../stores/allListsStore";
  import { contestants } from "../constants.ts/contestants";
  import type { Tiers } from "../types";
  import { tiers } from "../constants.ts/tiers";

  onMount(() => {
    allListsStore.refresh();
  });

  const calculate = (list: AllLists) => {
    const initialList: Record<
      string,
      { id: string; name: string; rating: number }
    > = contestants.reduce((agg, contestant) => {
      return {
        ...agg,
        [contestant.id]: {
          name: contestant.name,
          id: contestant.id,
          rating: 0,
        },
      };
    }, {});
    list.forEach((entry) => {
      Object.entries(entry.list).forEach(([key, tierRow]) => {
        const tier = key as Tiers;

        const tierRank = tiers[tier].rank;
        tierRow.entries.forEach((tierEntry) => {
          initialList[tierEntry.id].rating += tierRank;
        });
      });
    });
    const initialRanks: Record<
      number,
      { id: string; name: string; rating: number }[]
    > = {};
    const rankings = Object.values(initialList).reduce((ranks, contestant) => {
      const existingList = ranks[contestant.rating] ?? [];
      return {
        ...ranks,
        [contestant.rating]: [...existingList, contestant],
      };
    }, initialRanks);
    return Object.entries(rankings).sort(
      (a, b) => parseInt(b[0]) - parseInt(a[0])
    );
  };

  $: rankings = calculate($allListsStore);
</script>

<div class="container">
  {#each rankings as rankRow}
    <div class="row">
      <div class="rank">
        <h2>Rating: {rankRow[0]}</h2>
      </div>
      <ul>
        {#each rankRow[1] as contestant}
          <li>
            <img
              src="/contestants/{contestant.id}.webp"
              alt={contestant.name}
            />
            <p>{contestant.name}</p>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .container {
    padding: 2rem;
    overflow: hidden;
    border-radius: 4px;
  }

  .row {
    margin-bottom: 24px;
  }

  .rank {
    background-color: var(--color-blue);
    border-radius: 4px;
    padding: 0 1rem;
    margin: 8px 0;
  }

  ul {
    display: flex;
    column-gap: 8px;
    text-align: center;
  }

  img {
    height: 5rem;
    width: 5rem;
  }
</style>
