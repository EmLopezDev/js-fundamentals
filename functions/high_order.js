/*
In JavaScript a high-order function (HOF) is a function that either takes one or more functions as
arguments also known as callbacks, returns a function as a result, or does both.

This is possible because functions are first class citizens meaning they are treated like any other
variable or value. They can be passed around, stored, and manipulated just like a string, number, or
object.

*/
// HOF using callbacks
// The callback function
const sayGoodbye = () => console.log("Goodbye!");

// The higher-order function
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // Executing the callback function
}

greet("Alice", sayGoodbye);
// Output:
// Hello, Alice!
// Goodbye!

// HOF returning a function
// The higher-order function acting as a factory
function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const double = multiplier(2); // Creates a function that doubles numbers
const triple = multiplier(3); // Creates a function that triples numbers

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
