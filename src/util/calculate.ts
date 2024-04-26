import { contestants } from "../constants.ts/contestants";
import { tiers } from "../constants.ts/tiers";
import type { AllLists } from "../stores/allListsStore";
import type { Tiers } from "../types";

export const calculate = (list: AllLists) => {
  const initialList: Record<
    string,
    { id: string; name: string; rating: number }
  > = contestants.reduce((agg, contestant) => {
    return {
      ...agg,
      [contestant.id]: {
        name: contestant.name,
        id: contestant.id,
        rating: 0,
      },
    };
  }, {});
  list.forEach((entry) => {
    Object.entries(entry.list).forEach(([key, tierRow]) => {
      const tier = key as Tiers;

      const tierRank = tiers[tier].rank;
      tierRow.entries.forEach((tierEntry) => {
        initialList[tierEntry.id].rating += tierRank;
      });
    });
  });
  const initialRanks: Record<
    number,
    { id: string; name: string; rating: number }[]
  > = {};
  const rankings = Object.values(initialList).reduce((ranks, contestant) => {
    const existingList = ranks[contestant.rating] ?? [];
    return {
      ...ranks,
      [contestant.rating]: [...existingList, contestant],
    };
  }, initialRanks);
  return Object.entries(rankings).sort(
    (a, b) => parseInt(b[0]) - parseInt(a[0])
  );
};
