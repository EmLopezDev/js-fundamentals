/*
In JavaScript currying is a functional programming technique that transforms a function with
multiple arguments into a sequence of nesting functions, each taking a single argument. Instead
of taking all the arguments at once, a curried function takes the first argument and returns
a new function, which takes the second argument, and so on, until all the arguments are fulfilled
and the final result is returned.
*/

// Traditional function
const add = (a, b, c) => a + b + c;
add(2, 3, 4);

// Curried function
function addCurried(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}
add(2)(3)(4);

// Curried arrow function
const addCurried = (a) => (b) => (c) => a + b + c;
addCurried(2)(3)(4);

/*
At first glance this may look odd or feel unnecessarily complex. However don't think of it as one
giant function call. Look at it in steps:
*/

const step1 = add(2);
const step2 = step1(3);
const result = step2(4);

console.log(result); // 9

/*
Why Use A Currying Function?

Currying relies heavily on closures to retain memory of previously passed arguments. This provides
several practical advantages in software engineering:

- Partial Application: You can fix some arguments in advance and save the resulting function to be
  reused later with different remaining parameters.
- Code Reusability: It allows you to create specialized, modular helper functions out of a single
  generic function.
- Composition: Curried functions integrate seamlessly into functional pipelines, allowing you to
  pass small, configured functions into utility methods like map, filter, or reduce.
*/

// Practical use case
function calculateTax(rate, price) {
    return price * rate;
}

calculateTax(0.08, 100);
calculateTax(0.08, 200);
calculateTax(0.08, 500);

// In the example above the rate is the same and we keep repeating it. We could curry instead.
const calculateTax = (rate) => (price) => price * rate;
const calculateNYTax = calculateTax(0.08);
// returns back a function with rate already in place: calculateNYTax = (price) => price * 0.08

// Now because of its closure calculateNYTax remembers rate as 0.08, simplifying our use:
calculateNYTax(100); // 8
calculateNYTax(200); // 16
calculateNYTax(500); // 40

// Another Practical ue case
const log = (level) => (message) => {
    console.log(`[${level}] ${message}`);
};
// We could continuously call it this way
log("ERROR")("Database failed");
log("ERROR")("Network failed");
log("ERROR")("Authentication failed");

// or we could take advantage of currying and do this:
const error = log("ERROR");
const warning = log("WARNING");
const info = log("INFO");

// Now we can simplify our use:
error("Database failed");
error("Network failed");

warning("Memory usage high");

info("User logged in");

/*
Interview connection

"How does currying work in JavaScript?"

Currying transforms a multi-argument function into a sequence of functions that each take an
argument. Each returned function forms a closure over the arguments supplied previously, allowing
those values to remain available to later function calls.
*/
