/*
1. Function Declarations (Named Functions)

A function declaration is a standard named blocks of code. They are fully hoisted, meaning
JavaScript loads them into memory before executing the script, allowing them to be called before
they appear in the file. They also automatically receive a built-in arguments object containing all
passed parameters. Their binding to `this` is dynamic meaning the value of `this` is determined
entirely by how the function is invoked at runtime. When called as a standalone function, `this`
defaults to the global object (window or global) or undefined in strict mode. When attached to an
object as a method, `this` points to that object

Best used for:
- main structure functions / traditional functions
- if hoisting flexibility is desired
- helper utilities
- object methods that need to point to the object

Don't use when:
- you need `this` to remember and inherit it's parents scope (such as inside a nested timer or event
listener callback)
*/

// due to it being fully hoisted can be invoked before it is declared
printHello();

function printHello() {
    console.log("hello");
}

// `this`
function showContext() {
    return this;
}

const obj = { name: "Workspace", print: showContext };

console.log(obj.print());
// Prints: { name: "Workspace", print: [Function] } showing this points to obj

/*
2. Function Expressions

A function defined inside an expression and assigned to a variable. They are not hoisted, meaning
they cannot be invoked before the execution line where they are defined. Like declarations, they
possess a built-in arguments array-like object. They share the exact same dynamic this binding as
function declarations.

Best used for:
- conditional function creation
- inline assignment
- closures
- as a callback

Don't use when:
- when hoisting is desired
*/

const sayHello = function () {
    console.log("hello");
};

sayHello();

// `this`
const user = {
    role: "Admin",
    getRole: function () {
        return this.role;
    },
};
console.log(user.getRole()); // Prints: "Admin"

/*
3. Arrow Functions

A lightweight function using a fat arrow "=>" operator. Arrow functions themselves are anonymous
they can be stored inside a variable. Just like function expressions they are not hoisted. They also
do no have their own local arguments object, you must use "...args" instead. Their binding to `this`
is lexical meaning they do not create or own their own `this` context, instead they inherit the
`this` value of their enclosing parent scope. Parenthesis aren't needed if only one parameter is
present.

Best used for:
- array methods
- short utility computations
- as a callback
- callbacks that need to inherit their parents `this` context (setTimeout or Promise chaining)

Don't use when:
- as object methods where `this` is expected to reference the object
*/

const yellHello = () => {
    console.log("hello");
};

yellHello();

// `this`
const counter = {
    count: 0,
    start() {
        // Arrow function inherits 'this' from the start() method context
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    },
};

/*
4. Immediately Invoked Function Expressions (IIFE)

A standard function expression wrapped closely in grouping parentheses () and called instantly using
trailing invocation parentheses (). It completely encapsulates any variables inside to create a
isolated scope. Because IIFE executes automatically its `this` context defaults to the global
object (window or global) or undefined if running in strict mode. IIFE are not hoisted, are skipped
during the creation phase and will immediately be ran during the execution phase.

Best used for:
- instant setup tasks
- initialization logic and page load
- creating a private variable scope to prevent collision in global scripts

Don't use when:
- you need to re-use logic throughout the program
- when a block of code needs to be ran at a specific time or due to a user action
*/

(() => {
    console.log("hello");
})();

// `this`
(function () {
    // 'this' refers to window/global (or undefined in strict mode)
    console.log("IIFE running. Global context check:", this === globalThis);
})();

/*
5. Async Functions

Functions declared with the async prefix. They implicitly return a Promise automatically wrapping
any single return values. They allow the native use of the synchronous-looking await keyword within
their block to halt code execution cleanly until a promise settles. Their `this` context follows the
behavior of the way they are authored, meaning if they are a declaration or expression function `this`
is dynamic and if written as an arrow function `this` is inherited from the parent scope.

Best used for:
- managing sequential/parallel asynchronous flows like fetching data
- file system communication
- multi-step database interactions

Don't use when:
- pure synchronous operations that have zero promise lifecycle
*/

const fetchHello = async () => {
    console.log("hello");
};

fetchHello();

async function fetchHello2() {
    console.log("hello");
}

fetchHello2();

const apiService = {
    baseUrl: "https://example.com",
    // Async expression method: 'this' dynamically resolves to apiService
    async fetchData(endpoint) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        return response.json();
    },
};
