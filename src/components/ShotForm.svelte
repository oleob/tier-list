<script lang="ts">
  import { contestants } from "../constants.ts/contestants";
  import { malagaStore, type Shot } from "../stores/malagaStore";
  import { userStore } from "../stores/userStore";

  let data = {
    winner: "",
    loser: "",
    comment: "",
  };

  const onSubmit = async () => {
    await malagaStore.add({
      ...data,
      submittedBy: $userStore.user?.displayName,
    } as Shot);
    data = {
      winner: "",
      loser: "",
      comment: "",
    };
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <h2>Legg til ny shot</h2>
  <label>
    Vinner
    <select bind:value={data.winner}>
      {#each contestants as contestant}
        <option value={contestant.id}>{contestant.name}</option>
      {/each}
    </select>
  </label>
  <label>
    Taper
    <select bind:value={data.loser}>
      {#each contestants as contestant}
        <option value={contestant.id}>{contestant.name}</option>
      {/each}
    </select>
  </label>
  <label>
    Kommentar
    <input type="text" bind:value={data.comment} />
  </label>
  <button class="primary">Legg til</button>
</form>

<style>
  h2 {
    text-align: center;
    width: 100%;
  }
  form {
    padding: 1rem;
    background-color: var(--color-blue);
    border-radius: 4px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  select,
  input {
    background-color: var(--color-grey);
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
  }

  button {
    margin-top: 1rem;
    width: fit-content;
    color: var(--color-grey);
    background-color: var(--color-green);
  }
</style>
