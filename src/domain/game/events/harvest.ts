import { GameState } from "../types/game";
import { CROPS } from "../types/crops";

export type HarvestAction = {
  type: "item.harvested";
  index: number;
};

export function harvest(state: GameState, action: HarvestAction) {
  const fields = { ...state.fields };

  if (
    action.index >= 5 &&
    action.index <= 9 &&
    !state.inventory["Pumpkin Soup"]
  ) {
    throw new Error("Goblin land!");
  }

  if (
    action.index >= 10 &&
    action.index <= 15 &&
    !state.inventory["Sauerkraut"]
  ) {
    throw new Error("Goblin land!");
  }

  if (
    action.index >= 16 &&
    action.index <= 21 &&
    !state.inventory["Roasted Cauliflower"]
  ) {
    throw new Error("Goblin land!");
  }

  if (action.index > 21) {
    throw new Error("Field does not exist");
  }

  const field = fields[action.index];
  if (!field) {
    throw new Error("Nothing was planted");
  }

  const crop = CROPS[field.name];

  if (Date.now() - field.plantedAt < crop.harvestSeconds * 1000) {
    throw new Error("Crop is not ready to harvest");
  }

  const newFields = fields;
  delete newFields[action.index];

  const cropCount = state.inventory[field.name] || 0;

  return {
    ...state,
    fields: newFields,
    inventory: {
      ...state.inventory,
      [field.name]: cropCount + 1,
    },
  } as GameState;
}
