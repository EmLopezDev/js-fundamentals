/* The scope chain in JavaScript is the hierarchical mechanism the engine uses to resolve variable
values. When a variable is referenced, JavaScript starts looking for it in the current execution
scope. If it cannot find it there, it moves one level upward to the outer (parent) scope and
continues this lookup process until it either finds the variable or reaches the global scope. This
means the scope chain is entirely determined by where functions and blocks are physically written in
the code, not where they are executed or invoked.

Every time a function is created, it retains a reference to its outer lexical environment. When
nested, these references chain together.*/

const globalVar = "I am Global";

function outerFunction() {
    const outerVar = "I am Outer";

    function innerFunction() {
        const innerVar = "I am Inner";

        // 1. Found in the immediate local scope
        console.log(innerVar); // Output: "I am Inner"

        // 2. Not found in innerFunction -> looks up to outerFunction scope
        console.log(outerVar); // Output: "I am Outer"

        // 3. Not found in inner or outer -> looks up to global scope
        console.log(globalVar); // Output: "I am Global"

        // 4. Not found anywhere -> Throws Error
        console.log(unknownVar); // Uncaught ReferenceError
    }
    // 5. Unable to read from innerFunction -> Throws Error
    console.log(innerVar); // Uncaught ReferenceError

    innerFunction();
}

outerFunction();

/* The Three Core Layers of Scope

To understand the chain, it helps to understand what types of scope the chain moves through:

Block Scope:

Variables declared with let and const inside a block { ... } (like an if statement or a loop) are
confined strictly to that block.

Function Scope:

Variables declared inside a function (using var, let, or const) are accessible anywhere inside that
specific function.

Global Scope:

The outermost context. Any variable defined outside of all functions or blocks belongs here and is
accessible from anywhere in your codebase. */

/* Note: If a variable with the exact same name is declared in both an inner scope and an outer
scope, the inner variable shadows (hides) the outer variable. The JavaScript engine stops climbing
the chain the absolute moment it finds the first matching identifier.
*/

const user = "Alice"; // Global

function greet() {
    const user = "Bob"; // Local "shadows" the global variable
    console.log(user); // Output: "Bob" (Lookup stops immediately)
}

greet();

/*
Variable Shadowing

“Shadowing” doesn't modify or replace the outer variable. It just means that while you're inside the
inner scope, the inner variable with the same name is the one found first.
*/

let x = 10;

function outer() {
    let x = 20;

    if (true) {
        let x = 30;
        console.log(x); // prints 30
    }

    console.log(x); // prints 20
}

outer();

console.log(x); // prints 10

// Potential Interview question
// Without running it, tell me what gets logged and why:
let value = "Global";

function outer() {
    let value = "Outer";

    return function inner() {
        console.log(value);
    };
}

function run(fn) {
    let value = "Run";
    fn();
}

const myFunction = outer();

run(myFunction); // Answer: "Outer"

/*
Interview Ready Response:

JavaScript uses lexical scoping, so a function's scope chain is determined by where the function is
defined, not where it is called. The returned inner function closes over outer's lexical
environment, so it accesses "Outer" even when invoked inside run.
*/

// Classic interview trap: var inside a loop with closure
// What gets logged and why?
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100);
}

/*
Answer: 3, 3, 3

Interview Ready Answer

var is function-scoped, so the loop does not create a new i binding for each iteration. All three
callbacks close over the same i. By the time the timer callbacks execute, the loop has completed and
that shared i has become 3, so all three callbacks log 3.
*/
