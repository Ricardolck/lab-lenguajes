import type { Coffee } from "./types";

const coffees: Coffee[] = [
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    origin: "Etiopía",
    notes: ["floral", "bergamota", "té negro"],
    roast: "light",
    //roast: "extra",
    price: 14.9,
    stock: 12,
    discount: 0.1,
  },
/*
Type '"extra"' is not assignable to type 'Roast'.ts(2322)
types.ts(8, 3): The expected type comes from property 'roast' which is declared here on type 'Coffee'
(property) Coffee.roast: Roast
*/
  {
    id: 1,
    name: "Etiopía Yirgacheffe",
    origin: "Etiopía",
    notes: ["floral", "bergamota", "té negro"],
    roast: "light",
    price: 14.9, // error when removing this line because 'price' is required in type 'Coffee'
    stock: 12,
    discount: 0.1,
  },
/*
Property 'price' is missing in type '{ id: number; name: string; origin: string; notes: string[]; roast: "light"; stock: number; discount: number; }' but required in type 'Coffee'.ts(2741)
types.ts(9, 3): 'price' is declared here.
(property) Coffee.name: string
*/
]

//coffees[0].id = 2;
/*
Cannot assign to 'id' because it is a read-only property.ts(2540)
(property) Coffee.id: any
*/
console.log(coffees[0]);