import type { TierList } from "../types";
import { writable } from "svelte/store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firestore";

export type AllLists = Array<{
  id: string;
  name: string;
  img: string;
  list: TierList;
}>;

const createStore = () => {
  const { subscribe, set } = writable<AllLists>([]);

  const listRef = collection(db, "tier-lists");
  const refresh = async () => {
    const docs = await getDocs(listRef);
    const tempList: AllLists = [];

    docs.forEach((doc) => {
      const data = doc.data() as { name: string; img: string; list: TierList };
      tempList.push({ id: doc.id, ...data });
    });
    set(tempList);
  };

  refresh();

  return { subscribe, refresh };
};

export const allListsStore = createStore();
