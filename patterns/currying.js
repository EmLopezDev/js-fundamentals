/*
In JavaScript currying is a functional programming technique that transforms a function with
multiple arguments into a sequence of nesting functions, each taking a single argument. Instead of
taking all the arguments at once, a curried function takes the first argument and returns a new
function, which takes the second argument, and so on, until all the arguments are fulfilled and the
final result is returned.

Essentially currying lets us take a general function and progressively configure it into more
specialized, reusable functions, with closures preserving the arguments supplied at each step.
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

const addStep1 = add(2);
// addStep1 = (b) => 2 + b; creates a closure over a as value 2
const addStep2 = addStep1(3);
// addStep2 = (c) => 2 + 3 + c; creates closure over `b` as value 3 while still holding on to `a` as
// 2.
const result = addStep2(4);

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

/*
Implementing your own curry()
*/
// Takes in a function: Let's say an add function
function add(a, b, c) {
    return a + b + c;
}
// fn is the function it is changing
function curry(fn) {
    // creates and returns a function that collects all the arguments as they are added
    // ex: curriedAdd(1), curriedAdd(2) and so on. Becomes args =[1] then args = [1, 2]
    return function curried(...args) {
        /*
        - creates a closure around fn or add in this case and any args passed in
        - check if we have enough arguments to execute the fn or add in this case
        - args.length lets us know how many arguments we have taken in thus far
        - n.length lets us know how many arguments fn or add expects
        - the reason we use >= is in the event we received more args than needed, it will allow us
          to still run the fn, any extra args would be ignored but not block us if we use === */
        if (args.length >= fn.length) {
            // if we have enough arguments then we can execute fn or add with the args
            return fn(...args);
        }
        // if we don't have enough arguments take the current args and add it with the nextArgs
        // where it checks again, and keeps doing so while new args get added in each step
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
}

const curriedAdd = curry(add); // curriedAdd = function curried([]){}
const curriedAdd1 = curriedAdd(1); // curriedAdd1 = function curried([1]){}
const curriedAdd2 = curriedAdd1(2); // curriedAdd2 = function curried([1,2]){}
const curriedAdd3 = curriedAdd2(3); // curriedAdd3 = function curried([1,2,3]){}
// by this step there are enough args to run add so curriedAdd3 actually now holds the result 6;

/*
The curry function keeps collecting arguments until it has enough to run the original function. If
it doesn't have enough, it returns another function that waits for more. Once it has enough, it runs
the original function.
*/
