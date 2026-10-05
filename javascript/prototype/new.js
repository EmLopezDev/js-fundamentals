function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function () {
    return "Woof!";
};

const max = new Dog("Max");

/*
When the keyword `new` is used a few things are happening:

1. Create a new empty object

2. Connect that object's [[Prototype]] to Dog.prototype

3. Call Dog with `this` pointing to the new object

4. Return the new object
*/

/*
Exception for step 4

if a constructor explicitly returns an object, that object can replace the newly created object as
the result of new.
*/

function User(name) {
    this.name = name;

    return {
        name: "Mike",
        role: "Admin",
    };
}

const john = new User("John");

console.log(john);
// { name: "Mike", role: "Admin" }

/*
Exception to the exception of step 4

If a primitive is explicitly returned, JavaScript ignores it
*/

function User(name) {
    this.name = name;

    return 42;
}

const mark = new User("Mark");

console.log(mark);
// User { name: "Mark" }

/*
A constructor normally returns the new this object automatically. If it explicitly returns another
object, that object replaces the new object. If it returns a primitive, the primitive is ignored and
the original new object is returned.
*/
