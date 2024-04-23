export type TierEntry = {
  id: string;
  name: string;
};

export type TierRow = {
  entries: TierEntry[];
};

export type Tiers = "S" | "A" | "B" | "C" | "D" | "E" | "F";

export type TierList = Record<Tiers, TierRow>;
