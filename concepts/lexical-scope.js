/* Lexical scope simply means that where you write your code determines what variables your
functions can see. */

/*
When your code attempts to access a variable, the JavaScript engine performs a search in a sequence
called the Scope Chain:

Local Memory: It first looks inside the current function or block where the code is executing.

Outer Lexical Parent: If it cannot find the variable locally, it moves one step outward to the
parent environment.

Global Scope: It continues moving outward until it hits the global scope, which is the final link in
the chain. If it is still not found, it throws a ReferenceError.

Crucially: scope only flows outward. An inner function can look up to see outer variables, but a
parent function can never look inward to see variables defined inside its child functions.
*/

const globalVariable = "I am global";

function outerFunction() {
    const outerVariable = "I am from the outer function";

    function innerFunction() {
        const innerVariable = "I am local to inner";

        // Accessing variables via the lexical scope chain
        console.log(innerVariable); // ✅ Works: Found in local scope (local memory)
        console.log(outerVariable); // ✅ Works: Found in parent scope (outer lexical parent)
        console.log(globalVariable); // ✅ Works: Found in global scope
    }

    innerFunction();

    // Trying to look inward
    console.log(innerVariable); // ❌ ReferenceError: innerVariable is not defined here
}

outerFunction();
