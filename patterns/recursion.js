/*
Recursion in JavaScript is a programming technique where a function calls itself to break down a
complex problem into smaller, more manageable sub-problems.

Every proper recursive function must have two fundamental parts to prevent it from running
indefinitely and causing a "Maximum call stack size exceeded" error (also known as a stack
overflow):

- The Base Case: The exit condition that stops the function from calling itself. Probably the most
  important part to avoid a stack overflow.
- The Recursive Case: The part of the function where it calls itself with a modified, smaller input,
  moving closer to the base case.

The mental model would be:

"Keep solving a smaller version of the same problem until you reach the stopping condition."

Questions to ask yourself when faced with a recursive problem:

- 1. What is my base case?

    When do I stop?

- 2. What is my recursive case?

    When does the function call itself?

- 3. Am I moving toward the base case?

    Is each call making the problem smaller?

Best Used for:

Recursion shines when dealing with problems that have a naturally repetitive or hierarchical
structure:

- Tree Traversals: Walking through nested structures like the HTML DOM tree or complex JSON
  structures.
- Divide and Conquer: Algorithms like Merge Sort and Quick Sort.
- Dynamic Programming & Backtracking: Finding combinations or searching paths (e.g., mazes, chess
  games).
*/

// Calculating the factorial of a number a common interview question
function factorial(n) {
    // 1. Base Case: If n is 0 or 1, stop recursion and return 1
    if (n === 0 || n === 1) {
        return 1;
    }

    // 2. Recursive Case: Call factorial with a smaller number (n - 1)
    return n * factorial(n - 1);
}

console.log(factorial(4)); // Output: 24 (4 * 3 * 2 * 1)

/*
How it Works Under the Hood

When factorial(4) is called, JavaScript uses the Call Stack to keep track of the function
executions:

Each call to factorial gets put on the stack one over the other

factorial(4)
    ↓
4 × factorial(3)
        ↓
    3 × factorial(2)
            ↓
        2 × factorial(1)
                ↓
                1


Once the base case is hit, the stack starts working backwards returning the value from each call.
This process is called unwinding the call stack.

factorial(1)
    ↓
return 1


factorial(2)
    ↓
2 × 1
    ↓
return 2


factorial(3)
    ↓
3 × 2
    ↓
return 6


factorial(4)
    ↓
4 × 6
    ↓
return 24

*/

// A much simpler example

function countdown(number) {
    if (number === 0) {
        console.log("Done!");
        return;
    }

    console.log(number);

    countdown(number - 1);
}

countdown(3);

/*
Output:
3
2
1
Done!
*/

// Another common interview example Fibonacci

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(5);

/*
fib(5)
├── fib(4)
│   ├── fib(3)
│   │   ├── fib(2)
│   │   └── fib(1)
│   │
│   └── fib(2)
│
└── fib(3)
    ├── fib(2)
    └── fib(1)
*/

// Same Fibonacci example but also using memoization

function fibonacci(n, cache = new Map()) {
    if (n <= 1) {
        return n;
    }

    if (cache.has(n)) {
        return cache.get(n);
    }

    const result = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);

    cache.set(n, result);

    return result;
}

/*
Questions You Should Be Able to Answer

What is recursion?

- A function calling itself to solve progressively smaller versions of the same problem.

What is the base case?

- The condition that stops the recursion.

What is the recursive case?

- The part where the function calls itself with a smaller or changed version of the problem.

Why must recursion move toward the base case?

- Otherwise it may continue indefinitely until the call stack overflows.

What happens on the call stack?

- Each recursive call creates another stack frame. Once the base case returns, those calls finish in
  reverse order as the stack unwinds.

What is stack unwinding?

- The process of recursive function calls returning in reverse order after the base case has been
  reached.

When is recursion useful?

- Particularly with recursively structured data such as trees, nested objects, DOM nodes, comments,
  menus, and certain algorithms.

Recursion vs iteration?

- Both can solve many of the same problems. Loops often use less stack space, while recursion can
  express nested or tree-like problems more naturally.

What's the danger?

- Missing or unreachable base cases can cause infinite recursion and eventually a stack overflow.
*/
