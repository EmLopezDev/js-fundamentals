/*
In JavaScript, a prototype is a built-in mechanism that allows objects to inherit features,
properties, and methods from one another.

JavaScript is a prototype-based language. Instead of relying strictly on traditional classes like
Java or C++, it uses objects themselves as blueprints for other objects

Every JavaScript object has an internal link to another object, called its [[Prototype]].

- The Prototype Chain: When you try to access a property or method on an object, JavaScript first
looks at the object itself. If it cannot find it there, it moves up to the object's prototype,
then the prototype's prototype, and so on. This sequence is called the prototype chain. It ends
when it hits null.

prototype vs __proto__:

- prototype is a special property that only functions (specifically constructor functions) have. It
defines what properties/methods will be handed down to instances created by that function.
- __proto__ is an object property that points to the actual prototype object it is inheriting from.

Note: In modern code, it is recommended to use Object.getPrototypeOf() instead of __proto__.

Prototypes vs Modern Classes

In modern JavaScript (ES6+), developers usually use the class keyword. However, it is vital to know
that JavaScript classes are just "syntactic sugar" over prototypes
*/

// Prototype
// 1. Create a constructor function
function UserFunc(username, email) {
    this.username = username;
    this.email = email;
}

// 2. Add a method to the constructor's prototype
UserFunc.prototype.login = function () {
    return `${this.username} has logged in!`;
};

// 3. Create new object instances
const userOne = new UserFunc("Alice", "alice@example.com");
const userTwo = new UserFunc("Bob", "bob@example.com");

// Both instances have unique data, but share the exact same method in memory
console.log(userOne.login()); // Output: Alice has logged in!
console.log(userTwo.login()); // Output: Bob has logged in!

// Modern Standard

// 1. Create base prototype object
const animal = {
    eat() {
        console.log(`${this.name} is eating.`);
    },
};

// 2. Create a new object inheriting from animal
const dog = Object.create(animal);
dog.name = "Buddy";
dog.bark = function () {
    console.log("Woof!");
};

dog.eat(); // Output: Buddy is eating. (Inherited)
dog.bark(); // Output: Woof! (Own property)

// Modern Class "Syntactic Sugar"
// 1. Create a Class
class UserClass {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }
    login() {
        return `${this.username} has logged in!`;
    }
}

// 2. Create new object instances
const user1 = new UserClass("Alice", "alice@example.com");
const user2 = new UserClass("Bob", "bob@example.com");

// Both instances have unique data, but share the exact same method in memory
console.log(user1.login()); // Output: Alice has logged in!
console.log(user2.login()); // Output: Bob has logged in!

/*
When an inherited method is executed the `this` context always points ot the current invoking object
not the prototype where the method lives.
*/
