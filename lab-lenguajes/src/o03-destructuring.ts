import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import type { Coffee } from "./types";

export function coffeeCard({ name, origin, price }: Coffee): string {
  return `${name} (${origin}) · ${formatPrice(price)}`;
}

export function mainNote(coffee: Coffee): string {
  const [first, ...others] = coffee.notes;
  return `${first} (y ${others.length} más)`;
}

export function toPublicCoffee({ stock, ...publicCoffee }: Coffee): Omit<Coffee, "stock"> {
  return publicCoffee;
}

export function sumAll(...amounts: number[]): number {
  let total = 0;
  for (const amount of amounts) {
    total += amount;
  }
  return total;
}

console.log(coffeeCard(coffees[0])); // → "Etiopía Yirgacheffe (Etiopía) · 14.90 €"
console.log(mainNote(coffees[0]));   // → "floral (y 2 más)"
console.log(mainNote(coffees[1]));   // → "caramelo (y 1 más)"

console.log(toPublicCoffee(coffees[1]));
// → { id: 2, name: "Colombia Huila", origin: "Colombia",
//     notes: ["caramelo", "manzana roja"], roast: "medium", price: 12.9 }
console.log(coffees[1].stock); // → 3. El original sigue teniendo stock

console.log(sumAll(1, 2, 3)); // → 6
console.log(sumAll());        // → 0
console.log(sumAll(...coffees.map((coffee) => coffee.stock))); // → 48

// los ... aqui son un spread no un rest, lo que hacen es separar los valores del array para que 
// la funcion los pueda interpretar bien
