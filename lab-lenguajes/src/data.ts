import type { Coffee, Customer } from "./types.ts";

export const coffees: Coffee[] = [
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    origin: "Etiopía",
    notes: ["floral", "bergamota", "té negro"],
    roast: "light",
    price: 14.9,
    stock: 12,
    discount: 0.1,
  },
  {
    id: 2,
    name: "Colombia Huila",
    origin: "Colombia",
    notes: ["caramelo", "manzana roja"],
    roast: "medium",
    price: 12.9,
    stock: 3,
  },
  {
    id: 3,
    name: "Kenia AA",
    origin: "Kenia",
    notes: ["frutos rojos", "pomelo"],
    roast: "light",
    price: 15.5,
    stock: 0,
    discount: 0,
  },
  {
    id: 4,
    name: "Brasil Cerrado",
    origin: "Brasil",
    notes: ["chocolate", "avellana"],
    roast: "dark",
    price: 10.5,
    stock: 25,
  },
  {
    id: 5,
    name: "Guatemala Antigua",
    origin: "Guatemala",
    notes: ["cacao", "especias"],
    roast: "medium",
    price: 13.2,
    stock: 8,
    discount: 0.15,
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    notes: ["tierra", "cedro", "chocolate negro"],
    roast: "dark",
    price: 13.9,
    stock: 0,
  },
];

export const customers: Customer[] = [
  {
    id: 1,
    name: "Lucía",
    email: "lucia@mail.com",
    address: { street: "Calle Larios 5", city: "Málaga", zip: "29005" },
    preferences: { grind: "molido", newsletter: false },
  },
  {
    id: 2,
    name: "Marcos",
    email: "marcos@mail.com",
    preferences: {},
  },
  {
    id: 3,
    name: "Ana",
    email: "ana@mail.com",
    address: { street: "Gran Vía 12", city: "Madrid", zip: "28013" },
  },
];