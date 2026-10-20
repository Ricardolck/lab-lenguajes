import { coffees } from "./data";
import type { Roast } from "./types";

export function formatPrice(price: number, currency = "€"): string {
  return `${price.toFixed(2)} ${currency}`;
}

export function stockStatus(stock: number): string {
  if (stock === 0) {
    return "Agotado";
  } else if (stock < 5) {
    return "Últimas unidades";
  } else {
    return "Disponible";
  }
}

export function roastLabel(roast: Roast): string {
  switch (roast) {
    case "light":
      return "Tueste claro";
    case "medium":
      return "Tueste medio";
    case "dark":
      return "Tueste oscuro";
/*
Function lacks ending return statement and return type does not include 'undefined'.ts(2366)

Este error se daría si en el switch no se manejan todos los posibles valores de 'roast'.
*/
  }
}

console.log(formatPrice(14.9));      // → "14.90 €"
console.log(formatPrice(14.9, "$")); // → "14.90 $"
console.log(formatPrice(10));        // → "10.00 €"

for (const coffee of coffees) {
  console.log(
    `${coffee.name} · ${roastLabel(coffee.roast)} · ${formatPrice(coffee.price)} · ${stockStatus(coffee.stock)}`
  );
}
