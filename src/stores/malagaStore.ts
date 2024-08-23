import { writable } from "svelte/store";
import { contestants } from "../constants.ts/contestants";
import { userStore } from "./userStore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../api/firestore";

type Id = (typeof contestants)[number]["id"];

export type Shot = {
  winner: Id;
  loser: Id;
  comment?: string;
  submittedBy: string;
};

type ShotStore = Record<Id, Shot[]>;

const initialList: ShotStore = contestants.reduce((acc, { id }) => {
  acc[id] = [];
  return acc;
}, {} as ShotStore);

const createStore = () => {
  const { subscribe, set: storeSet } = writable<ShotStore>(initialList);
  const listRef = collection(db, "shots");

  const update = async () => {
    const snapshot = await getDocs(listRef);
    const shots = snapshot.docs.map((doc) => doc.data() as Shot);
    const newList = { ...initialList };
    shots.forEach((shot) => {
      newList[shot.loser] = [...newList[shot.loser], shot];
    });
    storeSet(newList);
  };

  const add = async (shot: Shot) => {
    await addDoc(listRef, shot);
    update();
  };

  userStore.subscribe(({ user }) => {
    if (user) {
      update();
    }
  });

  return {
    subscribe,
    add,
  };
};

export const malagaStore = createStore();
