/* In Javascript the spread and rest operators share the same syntax however they perform two
different operations.
*/

/*
Spread Operator: expands or unpacks an array or object into individual elements

Use the spread operator when you want to pull elements out of an array or object and spread them
into a new place.
*/

// A. Combining & Copying Arrays
// Great way to duplicate or merge arrays without mutating the original

const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];

// Merge arrays
const food = [...fruits, ...veggies];
console.log(food); // ['apple', 'banana', 'carrot', 'potato']

// Create a shallow copy
const cloneFruits = [...fruits];

// B. Copying & Merging Objects
// Perfect for updating state or combining configs

const user = { name: "Alice", age: 25 };
const job = { title: "Developer", age: 26 }; // 'age' will override user's age

const employee = { ...user, ...job, location: "NY" };
console.log(employee); // { name: 'Alice', age: 26, title: 'Developer', location: 'NY' }

// C. Passing Arguments to Functions
// If a function requires separate arguments, you can spread an array right into it

const numbers = [5, 12, 8];
console.log(Math.max(...numbers)); // Equates to Math.max(5, 12, 8) -> Output: 12

/*
Rest Operator: Condenses or packs multiple individual elements into a single array or object

Use the rest operator when you want to collect multiple items and bundle them together. This happens
in function parameters or destructuring.
*/

/*
A. Rest Parameters in Functions

Allows a function to accept any number of arguments as a clean, structured array.
Note: The rest parameter must always be the last parameter in the function definition. */

function sum(...numbers) {
    // 'numbers' is an actual array containing all passed arguments
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // Output: 10

// B. Destructuring (Arrays and Objects)
// Extract what you need, and gather the "rest" of the elements into a standalone variable.

// Array destructuring
const [first, second, ...remaining] = [10, 20, 30, 40, 50];
console.log(first); // 10
console.log(remaining); // [30, 40, 50]

// Object destructuring
const player = { username: "Gamer1", score: 90, level: 5 };
const { username, ...stats } = player;
console.log(username); // 'Gamer1'
console.log(stats); // { score: 90, level: 5 }
