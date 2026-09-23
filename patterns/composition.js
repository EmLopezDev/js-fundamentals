/*
Function composition is the practice of combining two or more functions to create a new function. It
pipes the output of one function directly into the input of the next, creating a data transformation
pipeline.

Note: In order for this to work the output of one function must be a valid input for the next
function and so on.
*/

// A simple example

const trim = (str) => str.trim();
const capitalize = (str) => str.toUpperCase();

// Manual composition: Inner function executes first, outer executes next
const prepareUsername = (name) => capitalize(trim(name));

console.log(prepareUsername("  alice  ")); // "ALICE"

/*
The Problem: Nesting functions inside-out gets incredibly difficult to read as you add more steps
(e.g., func1(func2(func3(func4(func5))))).
*/

/*
Composing Two Functions Dynamic

To avoid deep nesting, you can write a utility function to merge two single-argument (unary)
functions together:
*/

const composeTwo = (f, g) => (x) => f(g(x));

const trimAndCapitalize = composeTwo(capitalize, trim);
console.log(trimAndCapitalize("  bob  ")); // "BOB"

/*
Note the flow: Data flows from right-to-left. trim handles the data first, and its result passes to
capitalize.
*/

/*
Composing Multiple Functions

In real-world applications, you often need to chain more than two functions. You can create a
universal compose function using JavaScript's Rest Parameters (...) and
Array.prototype.reduceRight().

- reduceRight mirrors standard mathematical composition by executing the array of functions from
  right to left.
*/

const compose = function (...fns) {
    // creates a closure around ...fns or all the functions passed.
    return function (initialValue) {
        return fns.reduceRight((accumulator, currentFn) => currentFn(accumulator), initialValue);
    };
};
// Example functions
const exclaim = (str) => `${str}!`;
const repeat = (str) => `${str} ${str}`;

// Execution order: trim -> capitalize -> repeat -> exclaim
const transformText = compose(exclaim, repeat, capitalize, trim);

console.log(transformText("  hello ")); // "HELLO HELLO!"
/* trim runs first, then it passes the return value to capitalize which runs, then it passes its
return value to repeat, then it passes its return value to exclaim, which then returns the final
output of "HELLO HELLO!" */

/*
Alternative: Pipe (Left-to-Right)

If reading right-to-left feels unnatural, you can reverse the direction to match standard Western
reading order (left-to-right). This is called piping and relies on Array.prototype.reduce() instead
of reduceRight().
*/

const pipe = function (...fns) {
    // creates a closure around ...fns or all the functions passed.
    return function (initialValue) {
        return fns.reduce((accumulator, currentFn) => currentFn(accumulator), initialValue);
    };
};
// Execution order: trim -> capitalize -> repeat -> exclaim
const transformTextPipe = pipe(trim, capitalize, repeat, exclaim);

console.log(transformTextPipe("  hello ")); // "HELLO HELLO!"

/*
What You Should Be Able to Explain in an Interview

What is function composition?

- Function composition is combining functions so that the output of one function becomes the input
  of the next.

Why use it?

- It allows complex behavior to be built from smaller reusable functions and creates predictable
  transformation pipelines.

What is the difference between compose and pipe?

- compose traditionally executes functions right-to-left, while pipe executes them left-to-right.

Is compose() a HOF?

- Yes. It accepts functions and returns a new function.

Does composition use closures?

- A typical compose() implementation does. The returned function retains access to the functions
  passed into compose().

Are composition and currying the same?

- No. Currying changes how arguments are supplied. Composition connects functions together.

What makes functions easy to compose?

- Each function's output should be compatible with the next function's input. Small pure functions
  tend to compose particularly well.
*/
