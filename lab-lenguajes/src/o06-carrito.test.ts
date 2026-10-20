import { describe, expect, test } from "vitest";
import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import {
  addToCart,
  cartTotal,
  changeQuantity,
  createCartHistory,
  removeFromCart,
  type Cart,
} from "./o06-carrito";

const empty: Cart = [];
const cart1 = addToCart(empty, 1);
const cart2 = addToCart(cart1, 4);
const cart3 = addToCart(cart2, 1);
const cart4 = changeQuantity(cart3, 4, 3);
const cart5 = removeFromCart(cart4, 1);
const cart6 = changeQuantity(cart5, 4, 0);

describe("addToCart", () => {
  test("añade un café nuevo con cantidad 1", () => {
    expect(cart1).toEqual([{ coffeeId: 1, quantity: 1 }]);
  });

  test("si el café ya está, suma 1 a su cantidad", () => {
    expect(cart3).toEqual([
      { coffeeId: 1, quantity: 2 },
      { coffeeId: 4, quantity: 1 },
    ]);
  });
});

describe("changeQuantity", () => {
  test("pone la cantidad indicada", () => {
    expect(cart4).toEqual([
      { coffeeId: 1, quantity: 2 },
      { coffeeId: 4, quantity: 3 },
    ]);
  });

  test("con 0 o menos quita el café", () => {
    expect(cart6).toEqual([]);
    expect(changeQuantity(cart4, 1, -2)).toEqual([{ coffeeId: 4, quantity: 3 }]);
  });
});

describe("removeFromCart", () => {
  test("quita el café", () => {
    expect(cart5).toEqual([{ coffeeId: 4, quantity: 3 }]);
  });
});

describe("inmutabilidad", () => {
  test("los carritos anteriores no cambian", () => {
    expect(empty).toEqual([]);
    expect(cart1).toEqual([{ coffeeId: 1, quantity: 1 }]);
    expect(cart2).toEqual([
      { coffeeId: 1, quantity: 1 },
      { coffeeId: 4, quantity: 1 },
    ]);
  });

  test("sólo se copia lo que cambia", () => {
    expect(cart3).not.toBe(cart2); // carrito nuevo
    expect(cart3[0]).not.toBe(cart2[0]); // el café 1 cambió: objeto nuevo
    expect(cart3[1]).toBe(cart2[1]); // el café 4 no cambió: se comparte
  });
});

describe("cartTotal", () => {
  test("suma los precios con descuento", () => {
    expect(formatPrice(cartTotal(cart4, coffees))).toBe("58.32 €");
  });

  test("un café que no está en el catálogo cuenta como 0", () => {
    expect(cartTotal([{ coffeeId: 99, quantity: 1 }], coffees)).toBe(0);
  });

  test("un carrito vacío vale 0", () => {
    expect(cartTotal([], coffees)).toBe(0);
  });
});

describe("createCartHistory", () => {
  test("undo vuelve al carrito anterior", () => {
    const history = createCartHistory();
    history.add(1);
    history.add(4);
    history.undo();
    expect(history.current()).toEqual([{ coffeeId: 1, quantity: 1 }]);
  });

  test("empieza vacío y undo de más no pasa de vacío", () => {
    const history = createCartHistory();
    expect(history.current()).toEqual([]);
    history.add(1);
    history.undo();
    history.undo();
    expect(history.current()).toEqual([]);
  });

  test("deshacer devuelve la misma referencia que había, no una copia", () => {
    const history = createCartHistory();
    history.add(1);
    const before = history.current();
    history.add(4);
    history.undo();
    expect(history.current()).toBe(before);
  });

  test("cada historial lleva su propia cuenta", () => {
    const a = createCartHistory();
    const b = createCartHistory();
    a.add(1);
    expect(b.current()).toEqual([]);
  });
});
