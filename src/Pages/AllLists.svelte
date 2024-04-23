<script lang="ts">
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../api/firestore";
  import TierList from "../components/TierList.svelte";
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";

  const listRef = collection(db, "tier-lists");
  let list: Array<{ id: string; name: string; img: string; list: TierList }> =
    [];

  const fetchLists = async () => {
    const docs = await getDocs(listRef);
    const tempList: typeof list = [];

    docs.forEach((doc) => {
      const data = doc.data() as { name: string; img: string; list: TierList };
      console.log(data);
      tempList.push({ id: doc.id, ...data });
      console.log(data);
    });
    list = tempList;
  };

  onMount(() => {
    fetchLists();
  });
</script>

<ul>
  {#each list as item}
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
  }
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
  }

  li {
    background-color: #dedede;
    width: fit-content;
    padding: 8px;
    border-radius: 4px;
  }

  img {
    max-height: 80px;
  }
</style>
