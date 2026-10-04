/*
Javascript destructuring is a shorthand syntax introduced in ES6 that allows you to unpack values
from arrays or properties from objects directly into distinct variables. It makes your code cleaner,
more readable, and reduces the need for repetitive boilerplate code.
*/

// Object Destructuring: matches properties by their key name

const user = { name: "Alex", age: 28, city: "New York" };

// Destructuring
const { name, age } = user;

console.log(name); // 'Alex'
console.log(age); // 28

// If you want the local variable to have a different name than the object key, use a colon.

const { name: fullName, city: location } = user;

console.log(fullName); // 'Alex'
console.log(location); // 'New York'

// You can assign a fallback value in case the property doesn't exist or is undefined

const { role = "Guest" } = user;

console.log(role); // 'Guest' (since 'role' wasn't in the user object)

// Array Destructuring: Array destructuring extracts values based on their position (index) using
// square brackets

const colors = ["red", "green", "blue"];

// Destructuring
const [firstColor, secondColor] = colors;

console.log(firstColor); // 'red'
console.log(secondColor); // 'green'

// If you want to skip certain items, simply leave an empty space between commas.

const [primary, , tertiary] = colors;

console.log(primary); // 'red'
console.log(tertiary); // 'blue' (green was skipped)

// You can assign a fallback value in case the property doesn't exist or is undefined

// Setting a default value for the second item
const [first, second, third, fourth = "yellow"] = colors;

console.log(primary); // Output: 'red'
console.log(fourth); // Output: 'yellow' (fell back to default)

/* You can use the rest operator to gather the remaining properties or items into a completely new
object or array. */

// With objects
const options = { title: "Menu", width: 100, height: 200 };
const { title, ...dimensions } = options;
console.log(dimensions); // { width: 100, height: 200 }

// With arrays
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...restOfNumbers] = numbers;
console.log(restOfNumbers); // [3, 4, 5]

/* Deeply Nested Destructuring */

const localUser = {
    id: 101,
    info: { firstName: "Sarah", active: true },
};

const {
    info: { firstName },
} = localUser;

console.log(firstName); // 'Sarah'
// Note: 'info' itself is not created as a standalone variable here!

/*
Destructuring in function parameters

You can destructure objects directly within a function’s signature, which is heavily used in
frameworks like React.
*/
function displayUser({ name, age }) {
    console.log(`${name} is ${age} years old.`);
}

const person = { name: "Bob", age: 32 };
displayUser(person); // "Bob is 32 years old."
