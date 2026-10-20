import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import { finalPrice } from "./o04-opcionales";
import type { Coffee } from "./types";

interface CartItem {
  coffeeId: number;
  quantity: number;
}

export type Cart = CartItem[];

export function addToCart(cart: Cart, coffeeId: number): Cart {
  const exists = cart.some((item) => item.coffeeId === coffeeId);
  return exists
    ? cart.map((item) =>
        item.coffeeId === coffeeId ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...cart, { coffeeId, quantity: 1 }];
}

export function removeFromCart(cart: Cart, coffeeId: number): Cart {
  return cart.filter((item) => item.coffeeId !== coffeeId);
}

export function changeQuantity(cart: Cart, coffeeId: number, quantity: number): Cart {
  return quantity <= 0
    ? removeFromCart(cart, coffeeId)
    : cart.map((item) => (item.coffeeId === coffeeId ? { ...item, quantity } : item));
}

export function cartTotal(cart: Cart, list: Coffee[]): number {
  return cart.reduce((total, { coffeeId, quantity }) => {
    const coffee = list.find((c) => c.id === coffeeId);
    return total + (coffee ? finalPrice(coffee) : 0) * quantity;
  }, 0);
}

export interface CartHistory {
  add: (coffeeId: number) => void;
  undo: () => void;
  current: () => Cart;
}

// Cada cambio crea un carrito nuevo y los anteriores no se tocan, así que el
// historial es sólo una lista de referencias. Deshacer = quitar la última.
export function createCartHistory(): CartHistory {
  let carts: Cart[] = [[]];

  const current = (): Cart => carts[carts.length - 1];
  const save = (cart: Cart): void => {
    carts = [...carts, cart];
  };

  return {
    add: (coffeeId) => save(addToCart(current(), coffeeId)),
    undo: () => {
      if (carts.length > 1) {
        carts = carts.slice(0, -1);
      }
    },
    current,
  };
}

const empty: Cart = [];
const cart1 = addToCart(empty, 1);
const cart2 = addToCart(cart1, 4);
const cart3 = addToCart(cart2, 1);
const cart4 = changeQuantity(cart3, 4, 3);
const cart5 = removeFromCart(cart4, 1);
const cart6 = changeQuantity(cart5, 4, 0);

console.log(cart3); // → [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 1 }]
console.log(cart4); // → [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 3 }]
console.log(cart5); // → [{ coffeeId: 4, quantity: 3 }]
console.log(cart6); // → []

// Los carritos anteriores no han cambiado
console.log(empty); // → []
console.log(cart1); // → [{ coffeeId: 1, quantity: 1 }]

// Sólo se copia lo que cambia
console.log(cart3 === cart2);       // → false. Es un carrito nuevo
console.log(cart3[0] === cart2[0]); // → false. El café 1 cambió: es un objeto nuevo
console.log(cart3[1] === cart2[1]); // → true. El café 4 no cambió: se comparte

console.log(formatPrice(cartTotal(cart4, coffees))); // → "58.32 €"
console.log(formatPrice(cartTotal([{ coffeeId: 99, quantity: 1 }], coffees))); // → "0.00 €"

// Historial con undo
const history = createCartHistory();
history.add(1);
history.add(4);
history.undo();
console.log(history.current()); // → [{ coffeeId: 1, quantity: 1 }]

history.undo();
history.undo(); // de más: no pasa de vacío
console.log(history.current()); // → []
