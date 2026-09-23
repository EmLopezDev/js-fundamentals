/*
Memoization is an optimization technique used to speed up applications by storing the results of
expensive function calls and returning the cached result when the same inputs occur again. In simple
terms, it trades memory space for execution speed.

The Core Mechanism

When a memoized function is executed, it follows three steps:

- Check the cache: Does the result for these specific arguments already exist?
- Return if found: If yes, return the saved result instantly without running the computation again.
- Compute and save: If no, run the heavy computation, save the result in the cache, and then return
  it.
*/

// take in a function as fn you want to memoize
function memoize(fn) {
    // creates a cache object to store previously encountered args/values
    const cache = {};
    // returns a function that takes in an arg: this version only takes one arg at a time
    // the returned function creates a closure around the incoming fn and the cache
    return function (arg) {
        // if the incoming arg is stored in the cache as a key its value is returned from the cache
        if (arg in cache) {
            // and returned
            return cache[arg];
        }
        // if not the passed function is ran using the arg
        const result = fn(arg);
        // we then store the result in the cache using the arg as the key
        cache[arg] = result;
        // we return the result
        return result;
    };
}

function square(num) {
    return num * num;
}

const memoizedSquare = memoize(square);

memoizedSquare(2); // calculate
memoizedSquare(5); // calculate
memoizedSquare(10); // calculate

/*
cache = {
    2  → 4,
    5  → 25,
    10 → 100
}

if memoizedSquare(2) is ran again the value (4) is returned from the cache instead of having to be
computed again and the same goes for any previously cached value
*/

/*
A better implementation of the above memoization is using Map
*/

function memoize(fn) {
    /*
    A Map is better for caching because it’s designed for key-value storage, supports any data type
    as a key, and provides convenient methods like has(), get(), and set()
    */
    const cache = new Map();

    return function (arg) {
        if (cache.has(arg)) {
            return cache.get(arg);
        }

        const result = fn(arg);

        cache.set(arg, result);

        return result;
    };
}

// or for multiple args
function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        /* since ...args is now an array we must store the array as a key in the cache by
        converting it into a string*/
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);

        cache.set(key, result);

        return result;
    };
}

/*
What kind of functions should be memoized?

Expensive computation + Repeated inputs = Good memoization candidate
*/

/*
Questions You Should Be Able to Answer

What is memoization?

- Memoization caches the result of a function based on its inputs so repeated calls with the same
  inputs can return the stored result instead of recalculating it.

Why use it?

- To avoid repeating expensive calculations.

What does the cache contain?

- input → result

Why is closure important?

- The closure preserves the cache between calls to the memoized function.

What happens on a cache miss?

- Check cache -> not found -> run fn -> save result -> return result

What happens on a cache hit?

- Check cache -> found -> return saved result

What's the trade-off?

- Memoization uses additional memory to reduce repeated computation.

When is it most useful?

- When a function is expensive and frequently receives the same inputs.
*/
