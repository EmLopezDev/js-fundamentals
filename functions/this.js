/*
In JavaScript, the value of the `this` keyword is determined at runtime based on how a function is
called, not where it is defined.

To figure out what `this` refers to, JavaScript follows four main binding rules.

1. new Binding (Highest Priority)

When a function is invoked with the new keyword (as a constructor function), JavaScript
automatically creates a brand-new, empty object and binds `this` to that new object.
*/

class Person {
    constructor(name) {
        // JavaScript implicitly creates: `this` = {};
        this.name = name;
    }
}

const user = new Person("Alice");
console.log(user.name); // "Alice" -> `this` points to the new `user` object

/*
2. Explicit Binding

If a function uses .call(), .apply(), or .bind(), `this` is explicitly defined by the developer. You
are forcing JavaScript to use a specific object as `this`.

- call and apply: Invoke the function immediately with the provided context.
- bind: Returns a brand-new function with `this` permanently locked to the specified object,
regardless of how it is called later.
*/

function greet() {
    console.log(`Hello, my name is ${this.name}`);
}

const person = { name: "Bob" };

// Force `this` to be `person`
greet.call(person); // "Hello, my name is Bob"

/*
3. Implicit Binding

When a function is called as a method of an object (using dot notation like obj.method()), `this`
points to the object directly to the left of the dot.
*/

const counter = {
    count: 0,
    increment() {
        this.count += 1; // `this` points to `counter`
        return this.count;
    },
};

counter.increment(); // 1

/*
NOTE Watch out for Implicit Loss:

If you assign a method to a variable and call it as a standalone function, it loses its object
attachment and drops down to the Default Binding rule below
*/

const copy = counter.increment;
copy(); // This loses it's object attachment

/*
4. Default Binding (Lowest Priority)

If none of the above rules apply—meaning a regular function is called entirely on its own without
any prefixes—JavaScript resorts to the default fallback.

- In Non-Strict Mode: `this` defaults to the global object (window in browsers, global in Node.js).
- In Strict Mode ("use strict";): `this` will be undefined.
*/

function show() {
    console.log(this);
}

show(); // Window (in browsers) or undefined (in strict mode)

/*
The Big Exception: Arrow Functions

Arrow functions (() => {}) bypass all four rules above. They do not have their own `this` binding.
Instead, they inherit `this` from the parent scope (lexical scope) exactly where they were defined.
Methods like .call(), .apply(), or .bind() will have no effect on an arrow function's `this`
*/
