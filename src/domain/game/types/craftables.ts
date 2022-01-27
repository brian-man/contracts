import { SeedName, SEEDS } from "../types/crops";
import { InventoryItemName } from "../types/game";

export type CraftAction = {
  type: "item.crafted";
  item: InventoryItemName;
  amount: number;
};

export type CraftableName = NFT | Tool | SeedName | Food;

export type Craftable = {
  id: number;
  name: CraftableName;
  description: string;
  price: number;
  ingredients: {
    item: InventoryItemName;
    amount: number;
  }[];
  limit?: number;
  amountLeft?: number;
  disabled?: boolean;
  type?: "NFT";
  requires?: InventoryItemName;
};

export type NFT =
  | "Sunflower Statue"
  | "Potato Statue"
  | "Christmas Tree"
  | "Scarecrow"
  | "Farm Cat"
  | "Farm Dog"
  | "Gnome"
  | "Chicken Coop"
  | "Gold Egg";

export type Tool =
  | "Axe"
  | "Pickaxe"
  | "Stone Pickaxe"
  | "Iron Pickaxe"
  | "Hammer"
  | "Rod";

export type Food =
  | "Flour"
  | "Pumpkin Soup"
  | "Roasted Cauliflower"
  | "Sauerkraut";

export const FOODS: Record<Food, Craftable> = {
  "Pumpkin Soup": {
    id: 501,
    name: "Pumpkin Soup",
    description: "A creamy soup that goblins love",
    price: 5,
    ingredients: [
      {
        item: "Pumpkin",
        amount: 5,
      },
    ],
    limit: 1,
  },
  Flour: {
    id: 502,
    name: "Flour",
    description: "Ground Wheat",
    price: 0.1,
    ingredients: [
      {
        item: "Wheat",
        amount: 3,
      },
    ],
  },
  "Roasted Cauliflower": {
    id: 503,
    name: "Roasted Cauliflower",
    description: "A Goblin's favourite",
    price: 0.1,
    ingredients: [
      {
        item: "Cauliflower",
        amount: 3,
      },
    ],
  },
  Sauerkraut: {
    id: 504,
    name: "Sauerkraut",
    description: "Fermented cabbage",
    price: 0.1,
    ingredients: [
      {
        item: "Cabbage",
        amount: 3,
      },
    ],
  },
};

export const TOOLS: Record<Tool, Craftable> = {
  Axe: {
    id: 301,
    name: "Axe",
    description: "Used to collect wood",
    price: 1,
    ingredients: [],
  },
  Pickaxe: {
    id: 302,
    name: "Pickaxe",
    description: "Used to collect stone",
    price: 1,
    ingredients: [
      {
        item: "Wood",
        amount: 2,
      },
    ],
  },
  "Stone Pickaxe": {
    id: 303,
    name: "Stone Pickaxe",
    description: "Used to collect iron",
    price: 2,
    ingredients: [
      {
        item: "Wood",
        amount: 3,
      },
      {
        item: "Stone",
        amount: 3,
      },
    ],
  },
  "Iron Pickaxe": {
    id: 304,
    name: "Iron Pickaxe",
    description: "Used to collect gold",
    price: 5,
    ingredients: [
      {
        item: "Wood",
        amount: 5,
      },
      {
        item: "Iron",
        amount: 3,
      },
    ],
  },
  Hammer: {
    id: 305,
    name: "Hammer",
    description: "Used to construct buildings",
    price: 5,
    ingredients: [
      {
        item: "Wood",
        amount: 5,
      },
      {
        item: "Iron",
        amount: 2,
      },
    ],
    disabled: true,
  },
  Rod: {
    id: 306,
    name: "Rod",
    description: "Used to fish trout",
    price: 10,
    ingredients: [
      {
        item: "Wood",
        amount: 50,
      },
    ],
    disabled: true,
  },
};

export const NFTs: Record<NFT, Craftable> = {
  "Sunflower Statue": {
    id: 401,
    name: "Sunflower Statue",
    description: "A symbol of the holy token",
    price: 5,
    ingredients: [
      {
        item: "Sunflower",
        amount: 1000,
      },
      {
        item: "Stone",
        amount: 50,
      },
    ],
    limit: 1,
    amountLeft: 812,
    type: "NFT",
  },
  "Potato Statue": {
    id: 402,
    name: "Potato Statue",
    description: "The OG potato hustler flex",
    price: 0,
    ingredients: [
      {
        item: "Potato",
        amount: 100,
      },
      {
        item: "Stone",
        amount: 20,
      },
    ],
    limit: 1,
    amountLeft: 3412,
    type: "NFT",
  },
  Scarecrow: {
    id: 403,
    name: "Scarecrow",
    description: "Grow wheat faster",
    price: 50,
    ingredients: [
      {
        item: "Wheat",
        amount: 10,
      },
      {
        item: "Wood",
        amount: 10,
      },
    ],
    limit: 1,
    amountLeft: 1700,
    type: "NFT",
  },
  "Christmas Tree": {
    id: 404,
    name: "Christmas Tree",
    description: "Receieve a Santa Airdrop on Christmas day",
    price: 50,
    ingredients: [
      {
        item: "Wood",
        amount: 100,
      },
      {
        item: "Stone",
        amount: 50,
      },
    ],
    amountLeft: 0,
    type: "NFT",
  },
  "Chicken Coop": {
    id: 405,
    name: "Chicken Coop",
    description: "Collect 3x the amount of eggs",
    price: 50,
    ingredients: [
      {
        item: "Wood",
        amount: 10,
      },
      {
        item: "Stone",
        amount: 10,
      },
      {
        item: "Gold",
        amount: 10,
      },
    ],
    amountLeft: 1856,
    limit: 1,
    type: "NFT",
  },
  "Farm Cat": {
    id: 406,
    name: "Farm Cat",
    description: "Keep the rats away",
    price: 50,
    ingredients: [],
    amountLeft: 0,
    type: "NFT",
  },
  "Farm Dog": {
    id: 407,
    name: "Farm Dog",
    description: "Herd sheep 4x faster",
    price: 75,
    ingredients: [],
    amountLeft: 0,
    type: "NFT",
  },
  Gnome: {
    id: 408,
    name: "Gnome",
    description: "A lucky gnome",
    price: 10,
    ingredients: [],
    amountLeft: 0,
    type: "NFT",
  },
  "Gold Egg": {
    id: 409,
    name: "Gold Egg",
    description: "A rare egg, what lays inside?",
    price: 0,
    ingredients: [
      {
        item: "Egg",
        amount: 150,
      },
      {
        item: "Gold",
        amount: 50,
      },
    ],
    amountLeft: 82,
    type: "NFT",
  },
};

export const CRAFTABLES: Record<CraftableName, Craftable> = {
  ...TOOLS,
  ...NFTs,
  ...SEEDS,
  ...FOODS,
};
