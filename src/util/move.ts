import type { ActionReturn } from "svelte/action";
import type { Tiers } from "../types";

export function move(
  node: HTMLElement,
  props: { id: string; tier: Tiers }
): ActionReturn<{ props: { id: string; tier: Tiers } }> {
  const { id, tier } = props;
  const dragstart = (event: DragEvent) => {
    node.classList.add("dragging");
    if (event.dataTransfer) {
      event.dataTransfer.setData("id", id);
      event.dataTransfer.setData("tier", tier);
    }
  };

  const dragEnd = (event: DragEvent) => {
    node.classList.remove("dragging");
    event.dataTransfer?.clearData();
  };

  node.addEventListener("dragstart", dragstart);
  node.addEventListener("dragend", dragEnd);

  return {
    destroy: () => {
      node.removeEventListener("dragstart", dragstart);
      node.removeEventListener("dragend", dragEnd);
    },
  };
}
