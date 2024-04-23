import { writable } from "svelte/store";
import { getAuth, type User } from "firebase/auth";

const createUser = () => {
  const { subscribe, set } = writable<User>();
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      set(user);
    }
  });

  return { subscribe };
};

export const userStore = createUser();
