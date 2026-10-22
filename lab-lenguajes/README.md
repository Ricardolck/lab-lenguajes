# Laboratorio de lenguajes (TypeScript)

Katas de TypeScript sobre el catálogo de una tienda de café: tipos, funciones, destructuring, opcionales, métodos de array, inmutabilidad, pureza, uniones y genéricos, tipos de utilidad, closures e Immer.

## Cómo arrancarlo

Hace falta Node.js 20 o superior. El proyecto está en la carpeta `lab-lenguajes/`.

```bash
cd lab-lenguajes
npm install
npm run dev      # abre http://localhost:5173
```

**Dónde se ve la salida:** la página está en blanco a propósito. Todo sale por la **consola del navegador** (F12 → pestaña *Console*). `src/main.ts` importa las katas en orden (`o01` … `o11`) y cada una imprime sus resultados con `console.log`.

Para ver la salida de una sola kata en la terminal, sin navegador:

```bash
npx tsx src/o06-carrito.ts
```

## Salida de las katas

![alt text](./docs/katas.png)
![alt text](./docs/katas-1.png)
![alt text](./docs/katas-2.png)
![alt text](./docs/katas-3.png)

## Comprobación de tipos

```bash
cd lab-lenguajes
npx tsc
```

Sale **sin errores** (código de salida 0). El `tsconfig.json` tiene `noUnusedLocals` y `noUnusedParameters`, así que tampoco quedan imports ni variables sin usar.

![alt text](./docs/npx.png)

## Estructura

```
lab-lenguajes/
├── index.html
├── package.json
├── tsconfig.json
└── src/
    ├── main.ts                   # Importa todas las katas en orden
    ├── types.ts                  # Roast, Coffee, Address, Customer
    ├── data.ts                   # Catálogo (coffees) y clientes (customers)
    ├── o01-tipos.ts              # Errores de tipo provocados a propósito
    ├── o02-funciones.ts          # formatPrice, stockStatus, roastLabel
    ├── o03-destructuring.ts      # coffeeCard, mainNote, toPublicCoffee, sumAll
    ├── o04-opcionales.ts         # getCity, getGrind, wantsNewsletter, finalPrice
    ├── o05-arrays.ts             # availableCoffees, catalogLabels, stockValue
    ├── o06-carrito.ts            # addToCart, removeFromCart, changeQuantity, cartTotal
    ├── o07-pureza.ts             # Funciones puras e impuras
    ├── o08-uniones-genericos.ts  # OrderStatus, normalizeId, findById<T>
    ├── o09-utilidad.ts           # Pick, Omit, Partial y Record
    ├── o10-closures.ts           # createDiscount, createOrderIdGenerator
    └── o11-immer.ts              # Spread anidado frente a produce
```

## Respuestas 📝 y 🔍

Las respuestas están como comentarios en el código, junto a la kata a la que corresponden:

| Kata | Pregunta | Respuesta |
| --- | --- | --- |
| o01 | ¿Qué pasa si `roast` vale `"extra"`? | [o01-tipos.ts:15](src/o01-tipos.ts#L15). Error TS2322: `"extra"` no está en `Roast` |
| o01 | ¿Y si falta `price`? | [o01-tipos.ts:30](src/o01-tipos.ts#L30). Error TS2741: `price` es obligatoria |
| o01 | ¿Se puede cambiar el `id`? | [o01-tipos.ts:38](src/o01-tipos.ts#L38). Error TS2540: es `readonly` |
| o02 | ¿Qué pasa si el `switch` no cubre todos los tuestes? | [o02-funciones.ts:26](src/o02-funciones.ts#L26). Error TS2366: a la función le falta un `return` |
| o03 | ¿Qué son los `...` de `sumAll(...coffees.map(...))`? | [o03-destructuring.ts:39](src/o03-destructuring.ts#L39). Es *spread*, no *rest*: reparte el array en argumentos sueltos |
| o04 | ¿Por qué `??` y no `\|\|`? | [o04-opcionales.ts:39](src/o04-opcionales.ts#L39). Con `\|\|`, el `false` de Lucía se convierte en `true` |
| o05 | ¿Cambia el orden de `coffees` si usamos `sort` en vez de `toSorted`? | [o05-arrays.ts:17](src/o05-arrays.ts#L17). No, porque `sort` ordena la copia que devuelve `filter` |
| o07 | ¿Cuáles son puras y qué condición rompen las impuras? | [o07-pureza.ts](src/o07-pureza.ts). Comentario encima de cada función y versión pura de las impuras al final |
| o08 | ¿Qué pasa si falta un estado en `statusLabel`? | [o08-uniones-genericos.ts:11](src/o08-uniones-genericos.ts#L11). Error TS2741: `Record` exige todos los estados |
| o10 | ¿Es pura `blackFriday`? | [o10-closures.ts:18](src/o10-closures.ts#L18). Sí: el descuento capturado no cambia nunca |
| o10 | ¿Por qué `.map(blackFriday)` va sin paréntesis? | [o10-closures.ts:24](src/o10-closures.ts#L24). Porque a `map` se le pasa la función, no su resultado |
| o10 | ¿Es pura `nextOrderId`? | [o10-closures.ts:27](src/o10-closures.ts#L27). No: cada llamada cambia el contador y devuelve otra cosa |
| o11 | ¿Qué es más legible, spread o Immer? ¿Cuándo usaríais cada uno? | [o11-immer.ts:51](src/o11-immer.ts#L51) |

## Checklist

- [x] o01 · Tipos (`Roast`, `Coffee`, `Customer`, `Address`)
- [x] o02 · Funciones (`formatPrice`, `stockStatus`, `roastLabel`, recorrido con `for...of`)
- [x] o03 · Destructuring, rest y spread
- [x] o04 · Opcionales con `?.` y `??`, sin `if`
- [x] o05 · Arrays sin bucles (`filter`, `toSorted`, `map`, `reduce`, `some`, `every`, `find`)
- [x] o06 · Carrito inmutable (sin `push`, `splice` ni mutar `quantity`)
- [x] o07 · Pureza
- [x] o08 · Uniones, guardas con `typeof` y genéricos
- [x] o09 · Tipos de utilidad (`Pick`, `Omit`, `Partial`, `Record`)
- [x] o10 · Closures
- [x] o11 · Immer (`movedSpread`, `movedImmer`, `upgraded`)
- [x] `npx tsc` sin errores
- [x] README + bitácora de IA
- [x] p1  · Tests con Vitest de o05 y o06 (`npm test`, 23 tests en verde)
- [x] p2  · Historial del carrito con undo (`createCartHistory`, con un closure)
- [x] p3  · `groupByRoast` con `reduce`, sin mutar el acumulador
- [x] p4 · `sortBy` genérico con `keyof`, sin mutar (`toSorted` + `localeCompare`)
- [x] p7 · Modelad los datos de vuestro TFM (`tfm-types.ts`)
- [x] d4 · Un pedido como en React (reducer con Immer)

## 🤖 Bitácora de IA

**Herramienta:** Claude, en la extensión de Claude Code para VS Code. Le pasaba el enunciado de cada kata, revisaba lo que escribía y luego lo comprobaba yo: provocaba los errores a propósito, cambiaba una pieza por otra o comparaba la salida con lo que esperaba.

### 1 · `sort` en lugar de `toSorted`

#### Prompt

«En el fichero o05-arrays.ts. Ni un solo bucle: usa filter, map, toSorted, reduce, some, every y find. […] catalogLabels(list: Coffee[]): string[] → los disponibles, ordenados por precio de menor a mayor y convertidos con coffeeCard. En una sola cadena: filter → toSorted → map.»

#### Qué me dio

La cadena `list.filter(...).toSorted((a, b) => a.price - b.price).map(coffeeCard)`. Me explicó que usaba `toSorted` y no `sort` porque `sort` muta el array original.

#### Qué corregí y por qué

Antes de darlo por bueno quise ver ese efecto, así que cambié `toSorted` por `sort`. Pero `coffees` seguía en su orden original. Le pregunté por qué y el motivo es que `filter` ya devuelve un array nuevo, así que `sort` sólo reordena esa copia intermedia. Volví a poner `toSorted`, porque si alguien quita el `filter`, `sort` empezaría a reordenar el catálogo sin que nadie lo note, y lo dejé explicado en un comentario.

### 2 · `??` frente a `||` en la newsletter

#### Prompt

«En el fichero o04-opcionales.ts. […] wantsNewsletter(customer: Customer): boolean → su preferencia, o true por defecto. […] Usa ?. y ??, sin ningún if.»

#### Qué me dio

`customer.preferences?.newsletter ?? true`. Me avisó de que con `||` el `false` de Lucía se convertiría en `true`.

#### Qué corregí y por qué

Escribí `wantsNewsletterError` con `||` y la probé con Lucía. Devuelve `true`, así que la apuntaría a una newsletter que ha rechazado. La dejé en el fichero como contraejemplo, con un comentario.

### 3 · Comprobar que el compilador avisa

#### Prompt

«roastLabel(roast: Roast): string con un switch: "Tueste claro", "Tueste medio" y "Tueste oscuro".» Y en otra kata: «Un objeto statusLabel: Record<OrderStatus, string> con su texto en castellano […]».

#### Qué me dio

Un `switch` sin `default` y un `Record` con los cuatro estados. Me explicó que TypeScript avisaría si algún día faltaba un caso.

#### Qué corregí y por qué

En los dos casos lo comprobé quitando un caso a mano. Sin uno de los `case`, el `switch` da TS2366 porque a la función le falta un `return`. Sin `delivered`, el `Record` da TS2741. Copié los dos errores en comentarios para tenerlos como referencia. Además, cambié `statusMessage` para que devuelva una frase completa (`Tu pedido está: Tostando`) en vez de sólo la etiqueta.

### 4 · Errores de `tsc` al limpiar la kata de pureza

#### Prompt

«Para cada función, poner un comentario diciendo si es pura o impura y qué condición rompe. Después, escribe una versión pura de las impuras.»

#### Qué me dio

Las seis funciones comentadas, las cuatro versiones puras y un bloque `export { ... }` al final con todas.

#### Qué corregí y por qué

Quité el bloque `export`, porque el ejercicio no lo pedía. Entonces `tsc` empezó a dar cuatro errores TS6133: las funciones impuras ya no se usaban en ningún sitio. La IA me avisó en la siguiente kata y lo arreglé.
