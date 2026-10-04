/*
Mutation is changing and existing object or array rather than creating a new one. Mutation itself
isn't automatically bad. The problem occurs when multiple parts of your program share a reference to
the same object.
*/

const user = {
    name: "John",
    age: 30,
};

user.age = 31;
/* we didn't create a new object we simply modified aka mutated the value of age in the existing
user object */

// Why mutation can be a problem?
const originalUser = {
    name: "John",
    age: 30,
};

const updatedUser = originalUser;

updatedUser.age = 31;
/*
In this example we are attempting to mutate updatedUser's age value. Now to the untrained eye this
may look like it will work, but in actually because we did updatedUser = originalUser, what actually
is happening is we are telling updatedUser to reference or point to the same object as originalUser.
Because they hold the same reference to the same object, mutating it via updatedUser or originalUser
will mutate the same object causing the mutation to appear in both references. Therefore updatedUser
=== originalUser will be true because it is checking if the reference is equal not the data. This is
one of the main reasons cloning exists.
*/

// Here is an example with arrays
const original = [1, 2, 3];
const updated = original;

updated.push(4);

console.log(original);
// [1, 2, 3, 4]
// Same thing mutating either reference will mutate the same array.

/*
Mutating vs non-mutating operations

This is particularly important with arrays because some array methods mutate the original and others
return something new. When using array methods if you are unsure of what it returns always double
check to make sure it is what you expect, but always be cautious with mutating methods because it
will impact its usage throughout the code base.
*/

// example
const numbers = [3, 1, 2];

numbers.sort();

console.log(numbers);
// [1, 2, 3] - sort() mutates the original array
/*
Imagine you wanted to use a sorted version of numbers for only one specific part of your code base,
and innocently you do the above. Now it will work for that one part of your code, however if the
rest of your code base relies on the fact that it isn't sorted well now this "simple" mutation will
impact those parts that don't want it sorted because we updated the array that is being reference
throughout the code base.
*/

/*
Common mutating methods: push(), pop(), shift(), unshift(), splice(), sort(), and reverse().
Common non-mutating methods: map(), filter(), slice(), includes(), reduce(), and find().
*/

const numbers2 = [1, 2, 3];

const doubled = numbers2.map((num) => num * 2);

console.log(numbers2); // [1, 2, 3]
console.log(doubled); // [2, 4, 6]
// map() returns a new array, keeping the original numbers2 array un-modified.

/*
When you want to be able to mutate an object/array without it impacting the entire code base, this
is where cloning is necessary. Cloning creates a new object or array based on an existing one rather
than simply creating another reference to the same object.
*/

// Here is a simple cloning example (Shallow Copy)
const originalUser1 = {
    name: "John",

    address: {
        city: "New York",
    },
};

const copiedUser = { ...originalUser1 };
/* This is creating a new object that is a copy of the originalUser1 object, essentially their data
is the same but the object its self is not the same so originalUser1 === copiedUser will be false
even though the data is the same. This is because strict equality on an object/array checks if its
reference is equal meaning are these two references pointing to the same object in memory not
is the data in these two objects the same. */
