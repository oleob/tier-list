<script lang="ts">
  import { onMount } from "svelte";
  import { allListsStore } from "../stores/allListsStore";
  import { calculate } from "../util/calculate";

  onMount(() => {
    allListsStore.refresh();
  });

  type Entry = {
    id: string;
    name: string;
    rating: number;
  };

  const recursive = (
    subset: Entry[],
    sets: Array<{ teamA: Entry[]; teamB: Entry[] }>
  ): Array<{ teamA: Entry[]; teamB: Entry[] }> => {
    if (subset.length > 0) {
      const [entry, ...rest] = subset;
      const newSets: Array<{ teamA: Entry[]; teamB: Entry[] }> = [];
      sets.forEach((set) => {
        const set1 = { teamA: [...set.teamA, entry], teamB: [...set.teamB] };
        const set2 = { teamA: [...set.teamA], teamB: [...set.teamB, entry] };
        if (Math.abs(set1.teamA.length - set1.teamB.length) <= 1) {
          newSets.push(set1);
        }
        if (Math.abs(set2.teamA.length - set2.teamB.length) <= 1) {
          newSets.push(set2);
        }
      });
      return recursive(rest, newSets);
    } else {
      return sets;
    }
  };

  const findTeams = (players: Entry[]) => {
    const possibleTeams = recursive(players, [{ teamA: [], teamB: [] }]).map(
      ({ teamA, teamB }) => {
        const scoreA = teamA.reduce((agg, player) => agg + player.rating, 0);
        const scoreB = teamB.reduce((agg, player) => agg + player.rating, 0);
        return {
          teamA,
          teamB,
          diff: Math.abs(scoreA - scoreB),
        };
      }
    );

    const teams = possibleTeams.reduce(
      (smallest, teams) => {
        if (teams.diff < smallest.diff) {
          return teams;
        }
        return smallest;
      },
      { diff: 10000, teamA: [], teamB: [] }
    );
    return teams;
  };

  $: rankings = calculate($allListsStore)
    .map((item) => item[1])
    .flat();

  let selectedPlayers: Entry[] = [];

  $: teams = findTeams(selectedPlayers);
</script>

<article>
  <h2>Alle Spillere</h2>
  <ul>
    {#each rankings as player}
      <li>
        <button
          on:click={() => {
            if (selectedPlayers.length < 8) {
              selectedPlayers = [...selectedPlayers, player];
            }
          }}
        >
          <img src="/contestants/{player.id}.webp" alt={player.name} />
          <p>{player.name}</p>
        </button>
      </li>
    {/each}
  </ul>

  <h2>Lag (Balanse: {teams.diff})</h2>
  <div class="team">
    <h3>Lag 1</h3>
    <ul>
      {#each teams.teamA as player}
        <li>
          <button
            on:click={() => {
              if (selectedPlayers.length < 8) {
                selectedPlayers = selectedPlayers.filter(
                  (selectedPlayer) => selectedPlayer.id !== player.id
                );
              }
            }}
          >
            <img src="/contestants/{player.id}.webp" alt={player.name} />
            <p>{player.name} - {player.rating}</p>
          </button>
        </li>
      {/each}
    </ul>
  </div>
  <div class="team">
    <h3>Lag 2</h3>
    <ul>
      {#each teams.teamB as player}
        <li>
          <button
            on:click={() => {
              if (selectedPlayers.length < 8) {
                selectedPlayers = selectedPlayers.filter(
                  (selectedPlayer) => selectedPlayer.id !== player.id
                );
              }
            }}
          >
            <img src="/contestants/{player.id}.webp" alt={player.name} />
            <p>{player.name} - {player.rating}</p>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</article>

<style>
  article {
    padding: 1rem;
  }
  ul {
    display: flex;
    column-gap: 8px;
    text-align: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button:hover {
    filter: none;
  }

  .team {
    padding: 16px;
    background-color: var(--color-blue);
    border-radius: 4px;
    margin: 8px 0;
  }

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 4px;
  }
</style>
