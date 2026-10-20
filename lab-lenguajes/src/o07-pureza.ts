import { coffees } from "./data";
import type { Coffee } from "./types";
/*
// 1
// IMPURA: rompe la condición 1. Depende de `shippingCost`, una variable
// externa que puede cambiar: con la misma entrada puede dar otra salida.
let shippingCost = 3.5;
const totalWithShipping = (amount: number): number => amount + shippingCost;
*/
/*
// 2
// IMPURA: rompe la condición 2. Modifica su argumento: el café original
// se queda con el precio rebajado.
const applyDiscount = (coffee: Coffee, rate: number): Coffee => {
  coffee.price = coffee.price * (1 - rate);
  return coffee;
};
*/
// 3
// PURA: sólo depende de `list`, y `map` crea un array nuevo sin tocarlo.
const namesInCapitals = (list: Coffee[]): string[] =>
  list.map((coffee) => coffee.name.toUpperCase());
/*
// 4
// IMPURA: rompe la condición 2. `sort` ordena in place, así que reordena
// el array que recibe.
const sortByPrice = (list: Coffee[]): Coffee[] =>
  list.sort((a, b) => a.price - b.price);
*/
/*
// 5
// IMPURA: rompe la condición 1. Depende del reloj (`Date.now()`): sin
// cambiar la entrada, cada llamada devuelve algo distinto.
const createOrderId = (): string => `ORD-${Date.now()}`;
*/
// 6
// PURA: el `push` muta `tags`, pero es un array local creado dentro de la
// función. Desde fuera no cambia nada y la salida sólo depende de `coffee`.
const buildTags = (coffee: Coffee): string[] => {
  const tags: string[] = [];
  for (const note of coffee.notes) {
    tags.push(`#${note}`);
  }
  return tags;
};

// ─── Versiones puras de las impuras ─────────────────────────────

// 1. El coste de envío pasa a ser un argumento.
const totalWithShippingPure = (amount: number, shipping: number): number =>
  amount + shipping;

// 2. Devuelve un café nuevo en vez de modificar el recibido.
const applyDiscountPure = (coffee: Coffee, rate: number): Coffee => ({
  ...coffee,
  price: coffee.price * (1 - rate),
});

// 4. `toSorted` devuelve una copia ordenada y deja el original intacto.
const sortByPricePure = (list: Coffee[]): Coffee[] =>
  list.toSorted((a, b) => a.price - b.price);

// 5. El momento llega como argumento: quien llama decide qué hora usar.
const createOrderIdPure = (timestamp: number): string => `ORD-${timestamp}`;

console.log(totalWithShippingPure(20, 3.5)); // → 23.5, siempre
console.log(applyDiscountPure(coffees[1], 0.5).price, coffees[1].price); // → 6.45 12.9
console.log(sortByPricePure(coffees)[0].name, coffees[0].name); // → "Brasil Cerrado" "Etiopía Yirgacheffe"
console.log(createOrderIdPure(1700000000000)); // → "ORD-1700000000000", siempre
console.log(namesInCapitals(coffees)[0], buildTags(coffees[0])); // → "ETIOPÍA YIRGACHEFFE" ["#floral", "#bergamota", "#té negro"]
