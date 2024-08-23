<script lang="ts">
  import { contestants } from "../constants.ts/contestants";
  import { malagaStore } from "../stores/malagaStore";
  import ShotForm from "../components/ShotForm.svelte";

  $: list = Object.entries($malagaStore).sort(
    (a, b) => b[1].length - a[1].length
  );
</script>

<article>
  <h2>Malaga</h2>
  <ol class="contestants">
    {#each list as entry}
      {@const contestant = contestants.find((c) => c.id === entry[0])}
      <li class="contestant">
        <h3>{contestant?.name}: <b>{entry[1].length}</b></h3>
        <img
          class="image"
          src="/contestants/{contestant?.id}.webp"
          alt="{contestant?.name}c"
        />
        <details>
          <summary>Shots</summary>
          <ul>
            {#each entry[1] as shot}
              {@const winner = contestants.find((c) => c.id === shot.winner)}
              <li class="match" title={shot.comment}>
                <img
                  src="/contestants/{contestant?.id}.webp"
                  alt={contestant?.name}
                />
                <div class="vs">{" vs. "}</div>
                <img src="/contestants/{winner?.id}.webp" alt={winner?.name} />
              </li>
            {/each}
          </ul>
        </details>
      </li>
    {/each}
  </ol>
  <div class="form">
    <ShotForm />
  </div>
</article>

<style>
  h2 {
    text-align: center;
    font-size: 2rem;
    margin: 1rem 0;
  }
  .contestants {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .contestant {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    background-color: var(--color-blue);
    border-radius: 4px;
    height: fit-content;
    padding: 1rem;
  }
  h3 {
    font-weight: normal;
    text-align: center;
  }

  img {
    border-radius: 4px;
  }
  .image {
    height: 4rem;
    width: 4rem;
  }

  summary {
    font-weight: bold;
    margin-top: 0.5rem;
    cursor: pointer;
  }

  .match {
    display: flex;
    align-items: center;
    border-radius: 4px;
    width: fit-content;
    margin: 0.25rem 0;
  }

  .vs {
    margin: 0 8px;
  }

  .match img {
    height: 2rem;
    width: 2rem;
  }

  .form {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
</style>
