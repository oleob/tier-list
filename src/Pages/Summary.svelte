<script lang="ts">
  import { onMount } from "svelte";
  import { allListsStore } from "../stores/allListsStore";
  import { calculate } from "../util/calculate";

  onMount(() => {
    allListsStore.refresh();
  });

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
    border-radius: 4px;
  }
</style>
