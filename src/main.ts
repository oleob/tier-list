import { initAuth } from "./api/auth";
import "./api/firestore";
import "./app.css";
import App from "./App.svelte";

const init = () => {
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  initAuth();
  const app = new App({
    target: document.getElementById("app")!,
  });
  return app;
};

export default init();
