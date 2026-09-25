/*
A shallow copy creates a new top-level object or array, while nested objects and arrays remain
shared references.
*/

// Simple shallow copy
const original = {
    name: "John",
    age: 30,
};

const copy = { ...original };

/*
Here the spread operator creates a new object by spreading all the data in original into copy, now
instead of both referencing the same object they are referencing two different object that contain
the same data.
*/

copy.name = "Sarah";

console.log(original.name); // "John"
console.log(copy.name); // "Sarah"
// because the properties are primitives, we can change the copy without affecting the original;

/*
The important part of shallow copying begins when the object contains another object or array:
*/

const original2 = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy = { ...original2 };
/*
The spread operator copies only the top level property values. For name, the value is the primitive
string of "John", however for address the value is a reference to another object in memory.
JavaScript is essentially doing: copy.name = original2.name, copy.address = original2.address, which
if we remember how references work copy.address = original2.address is just telling copy.address to
reference or point to the same object as original2.address. This is why it is called a shallow copy
because it only clones/copies one level deep.

As a one liner simple remember: The spread operator isn't deciding "copy primitives but don't copy
objects." It copies the value of each top-level property. When that value happens to be an object
reference, the reference is what gets copied.
*/
