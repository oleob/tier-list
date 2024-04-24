import { get, writable } from "svelte/store";
import { doc, getDoc, setDoc } from "firebase/firestore";

import type { TierList, Tiers } from "../types";
import { db } from "../api/firestore";
import { contestants } from "../constants.ts/contestants";
import { userStore } from "./userStore";

const emptyList: TierList = {
  S: {
    entries: [],
  },
  A: {
    entries: [],
  },
  B: {
    entries: [],
  },
  C: {
    entries: [],
  },
  D: {
    entries: [],
  },
  E: {
    entries: [],
  },
  F: {
    entries: [],
  },
};

const createTierSTore = () => {
  const { subscribe, set: storeSet } = writable<TierList>(emptyList);
  let tierRef: ReturnType<typeof doc>;

  userStore.subscribe((user) => {
    if (user) {
      tierRef = doc(db, "tier-lists", user.email!);
      connect();
    }
  });

  const save = async () => {
    const snapshot = get({ subscribe });
    const { displayName, photoURL } = get(userStore);
    setDoc(tierRef, { name: displayName, img: photoURL, list: snapshot });
  };

  const connect = async () => {
    const snapshot = await getDoc(tierRef);
    if (!snapshot.exists()) {
      reset();
    } else {
      storeSet(snapshot.data().list as TierList);
    }
  };

  const reset = () => {
    const initialList = { ...emptyList };
    (Object.keys(initialList) as Tiers[]).forEach((key) => {
      initialList[key].entries = [];
    });
    contestants.forEach((contestant) => {
      initialList["F"].entries.push(contestant);
    });
    storeSet(initialList);
    save();
  };

  let timeoutRef: number;

  const set = (list: TierList) => {
    storeSet(list);
    clearTimeout(timeoutRef);
    timeoutRef = window.setTimeout(() => {
      save();
    }, 5000);
  };

  return { subscribe, set, save, reset };
};

export const tierStore = createTierSTore();

export const changeTier = (id: string, from: Tiers, to: Tiers) => {
  if (from === to) {
    return;
  }
  const current = { ...get(tierStore) };
  const entry = current[from].entries.find((entry) => entry.id === id);
  if (entry) {
    current[from].entries = current[from].entries.filter(
      (fromEntry) => fromEntry.id !== entry.id
    );
    current[to].entries.push(entry);
    tierStore.set(current);
  }
};
