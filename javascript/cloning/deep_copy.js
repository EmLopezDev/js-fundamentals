/*
In JavaScript, a deep copy creates a completely independent copy of an object or array. This means
that all nested objects and arrays are recursively duplicated, ensuring that changes made to the new
copy do not affect the original data.
*/

const original = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy = { ...original }; // Shallow copy

original === copy; // false

original.address === copy.address; // true

// With a shallow copy doing the following will also affect original.address, because they are
// referencing the same nested object
copy.address.city = "Boston";

original.address.city; // "Boston"

/* The above example is what deep cloning solves, creating and original/unique references to objects
in memory even if their data is the same, a true independent copy. If a change is made to the
original or copy it will not affect/mutate the other. */

/* structuredClone() is a modern JavaScript built in tool for deep cloning. It does have it's
limitations so don't view "deep" as literally copying everything.

structuredClone() handles many things that simple JSON-based cloning cannot, including nested
objects/arrays and types such as Date, Map, and Set. But it cannot clone every JavaScript value.
Functions, for example, aren't supported.
*/

const original2 = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy2 = structuredClone(original2);
/* All levels of copy2 are separate objects, no object in original2 share the same reference as any
object in copy2 */

// This works with nested arrays as well.

const original3 = {
    name: "John",
    hobbies: ["coding", "gaming"],
};

const copy3 = structuredClone(original3);

copy3.hobbies.push("reading");

console.log(original3.hobbies); // ["coding", "gaming"]

console.log(copy3.hobbies); // ["coding", "gaming", "reading"]

/* There is another way to "deep" clone an object using a much older technique that still works */

const original4 = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy4 = JSON.parse(JSON.stringify(original4));

/* Why this works?

- First: JSON.stringify(original4) converts the object into a JSON string at which point it is no
  longer an object instead it is a string, therefore it loses all it's reference to the original
  objects in memory.
- Second: JSON.parse("{}") reads the string and constructs brand new objects from the data, hence
  new references so, original4 === copy4 will be false

This technique too has its limitations and is also not a great choice because running this JSON
serialization won't guarantee everything is preserve for example undefined properties and functions
are omitted when JSON.stringify() converts it to a string. Dates are also not represent correctly.
*/

const original5 = {
    name: "John",
    age: undefined,
    created: new Date(),
    greet() {},
};

const copy5 = JSON.parse(JSON.stringify(original5));

/* this will effectively produce the following: copy5 = { name: "John", created:
"2026-09-26T18:10:00.000Z" }, as you can see age and greet are missing but also with new Date() it
is left as a string rather than being reconstructed into a date object */

/*
Easiest way to remember for an interview

Deep copy: Copy the entire nested structure when the new data must be fully independent of the
original.

Shallow copy: Copy only the levels necessary for the change. Most common for normal updates and
React state.

Memory trick:

- Shallow = copy what changed.
- Deep = separate everything.
*/
