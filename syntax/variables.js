/* In JavaScript, var, let, and const are keywords used to declare variables, but they handle scope,
reassignment, and hoisting differently. Modern JavaScript development primarily relies on const and
let, while var is largely avoided.

1. Scope (Where the variable lives)
- var is function-scoped. If you declare a var inside a loop or an if statement, it can still be
accessed outside that block, as long as it's within the same function.
- let and const are block-scoped. They only exist inside the specific pair of curly braces {} where
they are defined (like an if block, a for loop, or a function).
*/

if (true) {
    var standardVar = "I am accessible outside!";
    let blockLet = "I am trapped in this block";
}
console.log(standardVar); // Logs: "I am accessible outside!"
console.log(blockLet); // ReferenceError: blockLet is not defined

/* 2. Reassignment and Redeclaration
- var is highly flexible but prone to bugs. You can reassign its value and completely redeclare the
same variable name within the same scope without JavaScript complaining.
- let allows reassignment but blocks redeclaration. You can change the value later, but you cannot
declare another variable with the exact same name in that same scope.
- const strictly prevents both. Once assigned, you cannot change its value or redeclare it.

Note: If a const holds an object or an array, you can still mutate the properties or contents inside
it you just cannot point the variable to a completely new object or array. */

let count = 1;
count = 2; // Allowed!

const taxRate = 0.12;
taxRate = 0.15; // TypeError: Assignment to constant variable.

/*
3. Hoisting and the Temporal Dead Zone (TDZ) All three keywords are "hoisted" (moved to the top of
their scope during compilation).

However:

- var is initialized with a value of undefined. If you log it before its actual assignment line,
your code runs but prints undefined.
- let and const are hoisted but not initialized. They sit in a"Temporal Dead Zone" until the code
execution reaches their declaration line. Accessing them early throws a ReferenceError.


The Modern Best-Practice Rule

According to style guides, including the MDN Web Docs, you should aim to write code with this order
of preference:

- use const by default: Use this for every variable unless you explicitly know its value needs to change
later. This makes your code safer and intent clearer.
- use let only when necessary: Use this for counters, loops, or values that genuinely need to be
overwritten.
- Avoid using var entirely: There are almost no scenarios in modern JavaScript where var is preferred over
let or const.
*/
