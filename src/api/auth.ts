import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export const initAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      signInWithRedirect(auth, provider);
    }
    console.log(user);
  });
};
