import AllLists from "../Pages/AllLists.svelte";
import Home from "../Pages/Home.svelte";
import Readonly from "../Pages/Readonly.svelte";
import Summary from "../Pages/Summary.svelte";
import Teams from "../Pages/Teams.svelte";

export const routes = {
  "/": Home,
  "/all/:id": Readonly,
  "/all": AllLists,
  "/summary": Summary,
  "/teams": Teams,
};
