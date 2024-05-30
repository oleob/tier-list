import { writable } from "svelte/store";
import { getAuth, type User } from "firebase/auth";

const createUser = () => {
  const { subscribe, update } = writable<{
    user: User | undefined;
    loaded: boolean;
  }>({ user: undefined, loaded: false });
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      update((prevValue) => ({ ...prevValue, user }));
    }
  });

  auth.authStateReady().then(() => {
    update((prevValue) => ({ ...prevValue, loaded: true }));
  });

  return { subscribe };
};

export const userStore = createUser();
