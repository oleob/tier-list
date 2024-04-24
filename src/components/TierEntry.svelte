<script lang="ts">
  import type { TierEntry, Tiers } from "../types";
  import { move } from "../util/move";

  export let entry: TierEntry;
  export let tier: Tiers;
  export let editable: boolean;
</script>

<div use:move={{ id: entry.id, tier }} draggable={editable}>
  <img draggable="false" src="/contestants/{entry.id}.webp" alt={entry.name} />
  <p>{entry.name}</p>
</div>

<style>
  div {
    background-color: black;
    margin: 8px;
    border-radius: 4px;
    overflow: hidden;
    transition: opacity 0.1s ease-in-out;
    cursor: grab;
  }

  div:active {
    cursor: grabbing;
  }

  :global(.dragging) {
    opacity: 0.5;
  }

  img {
    display: block;
    width: 5rem;
    height: 5rem;
  }
  p {
    font-size: 0.875rem;
    text-align: center;
  }
</style>
