import { coffees, customers } from "./data";
import type { Coffee, Customer } from "./types";
import { formatPrice } from "./o02-funciones";

export function getCity(customer: Customer): string {
  return customer.address?.city ?? "Sin dirección";
}

export function getGrind(customer: Customer): "grano" | "molido" {
  return customer.preferences?.grind ?? "grano";
}

export function wantsNewsletter(customer: Customer): boolean {
  return customer.preferences?.newsletter ?? true;
}

export function wantsNewsletterError(customer: Customer): boolean {
  return customer.preferences?.newsletter || true;
}

export function finalPrice(coffee: Coffee): number {
  return coffee.price * (1 - (coffee.discount ?? 0));
}

for (const customer of customers) {
  console.log(
    `${customer.name} · ${getCity(customer)} · ${getGrind(customer)} · newsletter: ${wantsNewsletter(customer)}`,
  );
}
// → Lucía · Málaga · molido · newsletter: false
// → Marcos · Sin dirección · grano · newsletter: true
// → Ana · Madrid · grano · newsletter: true

console.log(formatPrice(finalPrice(coffees[0]))); // → "13.41 €" (10 % de descuento)
console.log(formatPrice(finalPrice(coffees[1]))); // → "12.90 €" (sin descuento)
console.log(formatPrice(finalPrice(coffees[2]))); // → "15.50 €" (descuento 0)
console.log(formatPrice(finalPrice(coffees[4]))); // → "11.22 €" (15 %)

console.log(wantsNewsletterError(customers[0])); // → true, ya que al hacer un or con true siempre devuelve true