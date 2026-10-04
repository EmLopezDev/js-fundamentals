/*
Objects and arrays are reference values. This is an important concept to understand in order to
properly understand cloning.

When you assign an object to another variable, JavaScript does not copy the object. It copies the
reference to that object, unlike primitives (string, number, boolean, etc) which are copied as
values. This means multiple variables can point to the same object/array.

Some things to remember:

- Primitives (string, number, boolean, etc.) are copied as values.
- Objects and arrays are accessed through references.
- const a = {id: 1}, const b = a does not clone an object; a and b reference the same object.
- Changing an object through one reference affects what you see through every reference to that
  object.
- For objects, === compares object identity, not whether their contents look the same.
- Map object keys also use object identity.
*/

const user1 = { name: "John" };
const user2 = user1;

user2.name = "Sarah";

console.log(user1.name); // "Sarah"
console.log(user1 === user2); // true

const numbers1 = [1, 2, 3];
const numbers2 = numbers1;

numbers2.push(4);

console.log(numbers1); // [1, 2, 3, 4]
console.log(numbers2); // [1, 2, 3, 4]
// Both variables reference the same object, so changing it through user2 is visible through user1.
// The same goes for arrays since they are also objects in JavaScript

const a = { id: 1 };
const b = { id: 1 };

const arrA = [1, 2, 3];
const arrB = [1, 2, 3];

console.log(a === b); // false
console.log(arrA === arrB); // false

/* They contain identical data but are two separate objects in memory. Same goes for arrays.
a ──► { id: 1 }  Object #1
b ──► { id: 1 }  Object #2

arrA ──► [1, 2, 3]  Object #1
arrB ──► [1, 2, 3]  Object #2
*/

const c = { id: 1 };
const d = c;

const cache = new Map();

cache.set(c, "Hello");

console.log(cache.get(d)); // "Hello"
// c and d reference the same object, so either can be used to retrieve the Map entry.

let user3 = { name: "John" };
let user4 = user3;

user3 = { name: "Sarah" };

console.log(user4); // { name: "John" }
console.log(user3); // { name: "Sarah" }
// Mutation changes the object/array being referenced. Reassignment changes what the variable
// references.

user2.name = "Sarah"; // mutation
user2 = { name: "Sarah" }; // reassignment

arrA.push(4); // mutation
arrB = [4, 5, 6]; // reassignment
