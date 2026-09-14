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
