<script lang="ts">
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { allListsStore } from "../stores/allListsStore";

  onMount(() => {
    allListsStore.refresh();
  });
</script>

<ul>
  {#each $allListsStore as item}
    <li>
      <a use:link href="/all/{item.id}">
        <img src={item.img} alt={item.name} />
        <span>
          {item.name}
        </span>
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 2rem;
  }
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-white);
    padding: 16px;
  }

  li {
    background-color: var(--color-blue);
    width: fit-content;
    border-radius: 4px;
  }

  img {
    max-height: 80px;
    border-radius: 4px;
  }
</style>
