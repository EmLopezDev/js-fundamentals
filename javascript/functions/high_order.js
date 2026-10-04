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

const double = multiplier(2); // returns a function that doubles numbers by creating a closure on 2
const triple = multiplier(3); // returns a function that triples numbers by creating a closure on 3

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15

/*
Questions You Should Be Able to Answer

What is a higher-order function?

- A function that takes another function as an argument, returns a function, or both.

Why are HOFs possible in JavaScript?

- Because functions are first-class values, meaning they can be stored, passed as arguments, and
  returned from functions.

Give me a built-in example.

- array.map(callback);
- array.filter(callback);
- array.reduce(callback);

What's the difference between a HOF and callback?

- The higher-order function receives or returns functions; a callback is a function passed into
  another function to be executed by it.

Is debounce a HOF?

Yes: - debounce(fn, delay), It accepts fn and returns another function.

Is memoize a HOF?

Yes: memoize(fn), It accepts a function and returns a memoized function.

Is every HOF a closure?

- No. For example:

function execute(fn) { fn();
}

- That's a HOF because it accepts a function. But the HOF concept itself doesn't require closure
  behavior.

Is every callback a HOF?

- No. The callback is generally the function being passed into the HOF.
*/

/*
For interviews try and keep it simple at first, mention built in HOF like .map(), .filter(), or
.reduce().

you can say something like:

"map() is a common built-in higher-order function because it accepts a callback function that
defines how each element should be transformed."

Then mention your more advanced examples:

"Functions like debounce, throttle, and memoize are also higher-order functions because they accept
functions and return new functions."

That shows you understand both the simple and practical versions.
 */
