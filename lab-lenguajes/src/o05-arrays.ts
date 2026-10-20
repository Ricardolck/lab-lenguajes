import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import { coffeeCard } from "./o03-destructuring";
import type { Coffee } from "./types";

export function availableCoffees(list: Coffee[]): Coffee[] {
  return list.filter((coffee) => coffee.stock > 0);
}

export function catalogLabels(list: Coffee[]): string[] {
  return list
    .filter((coffee) => coffee.stock > 0)
    .toSorted((a, b) => a.price - b.price)
    .map(coffeeCard);
}

//cambiar de toSorted a sort no afecta al orden de coffees ya que ambos trabajan sobre lo que 
//devuelve filter, que es una copia del array original

export function stockValue(list: Coffee[]): number {
  return list.reduce((total, coffee) => total + coffee.price * coffee.stock, 0);
}

console.log(availableCoffees(coffees).map((coffee) => coffee.name));
// → ["Etiopía Yirgacheffe", "Colombia Huila", "Brasil Cerrado", "Guatemala Antigua"]

console.log(catalogLabels(coffees));
// → ["Brasil Cerrado (Brasil) · 10.50 €",
//    "Colombia Huila (Colombia) · 12.90 €",
//    "Guatemala Antigua (Guatemala) · 13.20 €",
//    "Etiopía Yirgacheffe (Etiopía) · 14.90 €"]

console.log(formatPrice(stockValue(coffees))); // → "585.60 €"

console.log(coffees.some((coffee) => coffee.stock === 0));          // → true
console.log(coffees.every((coffee) => coffee.notes.length > 0));     // → true
console.log(coffees.find((coffee) => coffee.id === 4)?.name ?? "No existe");  // → "Brasil Cerrado"
console.log(coffees.find((coffee) => coffee.id === 99)?.name ?? "No existe"); // → "No existe"

// Y la comprobación final: el catálogo sigue en su orden original
console.log(coffees.map((coffee) => coffee.name));
// → ["Etiopía Yirgacheffe", "Colombia Huila", "Kenia AA",
//    "Brasil Cerrado", "Guatemala Antigua", "Sumatra Mandheling"]