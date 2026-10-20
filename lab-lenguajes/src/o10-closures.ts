
export type PriceRule = (price: number) => number;

export const createDiscount = (rate: number): PriceRule => {
  return (price) => price * (1 - rate);
};

export const createOrderIdGenerator = (prefix: string): (() => string) => {
  let count = 0;
  return () => {
    count += 1;
    return `${prefix}-${count}`;
  };
};


const blackFriday = createDiscount(0.2);
//Blackfriday es una funcion pura ya que siempre aplica el mismo descuente de 0.2
const members = createDiscount(0.1);

console.log(blackFriday(10)); // → 8
console.log(members(10));     // → 9
console.log([10, 20, 15].map(blackFriday)); // → [8, 16, 12]
//Si blackfriday llevara () lo que le pasaría a map es el resultado en vez de la función.

const nextOrderId = createOrderIdGenerator("TUE");
//nextOrderId no es pura ya que el contador sera distinta en cada llamada
const nextGiftId = createOrderIdGenerator("REGALO");

console.log(nextOrderId()); // → "TUE-1"
console.log(nextOrderId()); // → "TUE-2"
console.log(nextGiftId());  // → "REGALO-1"
console.log(nextOrderId()); // → "TUE-3"