/*
A closure in JavaScript is the combination of a function bundled with reference to its surrounding
state (lexical environment). In other words a closure allows an inner function access to the outer
function's scope even after the outer function has finished executing.
*/

function outerFunction() {
    let outerVariable = "I am from the outer scope!";

    function innerFunction() {
        // innerFunction forms a closure over outerVariable
        console.log(outerVariable);
    }

    return innerFunction;
}

const myClosure = outerFunction();
// outerFunction has now finished executing and its stack frame is gone.

myClosure(); // Logs: "I am from the outer scope!"

/*
Think of a closure as a backpack, when a function is declared it packs all the variables available
in its current scope (lexical scope) into this backpack. No matter where that function gets passed
or executed it brings the backpack along and can access/update those variables.

This would be the lexical environment, any variables in this environment get stored in the
backpack
-------------------------------------------------------
|                                                     |
|   let outerVariable = "I am from the outer scope!"; |
|                                                     |
|   function innerFunction() {                        |
|       console.log(outerVariable);                   |
|                                                     |
|    }                                                |
|                                                     |
-------------------------------------------------------

BackPack
--------------------------------------------------------
|                                                      |
|   let outerVariable = "I am from the outer scope!";  |
|                                                      |
--------------------------------------------------------
*/
