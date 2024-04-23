<script lang="ts">
  import { doc, getDoc } from "firebase/firestore";
  import TierListComponent from "../components/TierList.svelte";
  import { db } from "../api/firestore";
  import type { TierList } from "../types";
  export let params: { id: string };

  let data: TierList | undefined;
  const fetchList = async (id: string) => {
    const docRef = doc(db, "tier-lists", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      data = snapshot.data().list as TierList;
    }
  };

  $: fetchList(params.id);
</script>

{#if data}
  <TierListComponent list={data} editable={false} />
{/if}
