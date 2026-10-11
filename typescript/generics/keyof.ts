/*
The keyof Operator

`keyof T` produces a union of the property keys of type `T`.
*/

// Example 1
interface Product {
    id: number;
    name: string;
    price: number;
}

type ProductKeys = keyof Product; // "id" | "name" | "price"

// Example 2
function sortProducts(key: keyof Product) {
    console.log(`Sorting by ${key}`);
}

sortProducts("price"); // Valid
sortProducts("category"); // Error category isn't a key on Product

/*
- keyof works with types, not runtime object values.
- It prevents using keys that aren't part of the specified type.
- For types with index signatures, keyof may also produce string or number, not only string
  literals.
*/
