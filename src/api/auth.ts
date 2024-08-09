import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const initAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  auth.onAuthStateChanged(async (user) => {
    await auth.authStateReady();
    if (!user) {
      await signInWithPopup(auth, provider);
    }
  });
};
