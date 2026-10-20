import { coffees, customers } from "./data";
import type { Coffee, Roast } from "./types";

export type CoffeePreview = Pick<Coffee, "id" | "name" | "price">;

export const toPreview = (coffee: Coffee): CoffeePreview => { return { id: coffee.id, name: coffee.name, price: coffee.price }; };

export type NewCoffee = Omit<Coffee, "id">;

export const createCoffee = (data: NewCoffee, list: Coffee[]): Coffee => {
  const maxId = list.reduce((max, coffee) => Math.max(max, coffee.id), 0);
  return { ...data, id: maxId + 1 };
};

export const updateCoffee = (coffee: Coffee, changes: Partial<NewCoffee>): Coffee => ({
  ...coffee,
  ...changes,
});

export const countByRoast = (list: Coffee[]): Record<Roast, number> =>
  list.reduce(
    (counts, coffee) => ({ ...counts, [coffee.roast]: counts[coffee.roast] + 1 }),
    { light: 0, medium: 0, dark: 0 }
  );

export const groupByRoast = (list: Coffee[]): Record<Roast, Coffee[]> =>
  list.reduce<Record<Roast, Coffee[]>>(
    (groups, coffee) => ({
      ...groups,
      [coffee.roast]: [...groups[coffee.roast], coffee],
    }),
    { light: [], medium: [], dark: [] }
  );

export const sortBy = <T, K extends keyof T>(items: T[], key: K): T[] =>
  items.toSorted((a, b) => {
    const x = a[key];
    const y = b[key];
    if (typeof x === "string" && typeof y === "string") {
      return x.localeCompare(y, "es");
    }
    if (typeof x === "number" && typeof y === "number") {
      return x - y;
    }
    return 0;
  });

console.log(toPreview(coffees[0]));
// → { id: 1, name: "Etiopía Yirgacheffe", price: 14.9 }

console.log(
  createCoffee(
    {
      name: "Ruanda Nyamasheke",
      origin: "Ruanda",
      notes: ["melocotón", "té verde"],
      roast: "light",
      price: 16.4,
      stock: 10,
    },
    coffees,
  ),
);
// → { id: 7, name: "Ruanda Nyamasheke", origin: "Ruanda", ... }

const cheaper = updateCoffee(coffees[1], { price: 11.9, stock: 10 });
console.log(cheaper.price, cheaper.stock);         // → 11.9 10
console.log(coffees[1].price, coffees[1].stock);   // → 12.9 3

console.log(countByRoast(coffees)); // → { light: 2, medium: 2, dark: 2 }

const groups = groupByRoast(coffees);
console.log(groups.light.map((coffee) => coffee.name));  // → ["Etiopía Yirgacheffe", "Kenia AA"]
console.log(groups.medium.map((coffee) => coffee.name)); // → ["Colombia Huila", "Guatemala Antigua"]
console.log(groups.dark.map((coffee) => coffee.name));   // → ["Brasil Cerrado", "Sumatra Mandheling"]
console.log(groupByRoast([]));                           // → { light: [], medium: [], dark: [] }

console.log(sortBy(coffees, "price").map((coffee) => coffee.price)); // → [10.5, 12.9, 13.2, 13.9, 14.9, 15.5]
console.log(sortBy(customers, "name").map((customer) => customer.name)); // → ["Ana", "Lucía", "Marcos"]
console.log(coffees[0].name); // → "Etiopía Yirgacheffe". El original no cambia

//sortBy(coffees, "color");
// Argument of type '"color"' is not assignable to parameter of type 'keyof Coffee'.ts(2345)
