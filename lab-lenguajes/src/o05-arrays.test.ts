import { describe, expect, test } from "vitest";
import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";
import { availableCoffees, catalogLabels, stockValue } from "./o05-arrays";

describe("availableCoffees", () => {
  test("devuelve sólo los cafés con stock", () => {
    expect(availableCoffees(coffees).map((coffee) => coffee.name)).toEqual([
      "Etiopía Yirgacheffe",
      "Colombia Huila",
      "Brasil Cerrado",
      "Guatemala Antigua",
    ]);
  });

  test("con una lista vacía devuelve una lista vacía", () => {
    expect(availableCoffees([])).toEqual([]);
  });
});

describe("catalogLabels", () => {
  test("devuelve los disponibles ordenados por precio y formateados", () => {
    expect(catalogLabels(coffees)).toEqual([
      "Brasil Cerrado (Brasil) · 10.50 €",
      "Colombia Huila (Colombia) · 12.90 €",
      "Guatemala Antigua (Guatemala) · 13.20 €",
      "Etiopía Yirgacheffe (Etiopía) · 14.90 €",
    ]);
  });

  test("no cambia el orden del catálogo original", () => {
    const before = coffees.map((coffee) => coffee.name);
    catalogLabels(coffees);
    expect(coffees.map((coffee) => coffee.name)).toEqual(before);
  });
});

describe("stockValue", () => {
  test("suma precio × stock de todo el catálogo", () => {
    expect(formatPrice(stockValue(coffees))).toBe("585.60 €");
  });

  test("con una lista vacía vale 0", () => {
    expect(stockValue([])).toBe(0);
  });
});

describe("some, every y find sobre el catálogo", () => {
  test("hay algún café agotado", () => {
    expect(coffees.some((coffee) => coffee.stock === 0)).toBe(true);
  });

  test("todos los cafés tienen al menos una nota", () => {
    expect(coffees.every((coffee) => coffee.notes.length > 0)).toBe(true);
  });

  test("find encuentra el café 4 y no encuentra el 99", () => {
    expect(coffees.find((coffee) => coffee.id === 4)?.name ?? "No existe").toBe("Brasil Cerrado");
    expect(coffees.find((coffee) => coffee.id === 99)?.name ?? "No existe").toBe("No existe");
  });
});
