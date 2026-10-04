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

/*
Here a few ways to create shallow copies for objects and array
*/
const object = { id: 1 };
/*Spread syntax: */ const object2 = { ...object };
/*Object.assign() (older method): */ const object3 = Object.assign({}, object);

const array = [1, 2, 3, 4];
/*Spread syntax: */ const array2 = [...array];
/*Array.from(): */ const array3 = Array.from(array);
/* slice() */ const array4 = array.slice();

/*
One neat way to use the spread operator is in combination with a mutation/update
*/

const user = {
    name: "John",
    age: 30,
};

const updatedUser = {
    ...user,
    age: 31,
};

const numbers = [1, 2, 3, 4];

const updatedNumbers = [...numbers, 4, 5, 6];
/* here we are spreading all the data from user into updatedUser but at the same time updating or
technically overriding the age value to 31. For this to work however order matters, when properties
have the same key, the later value wins. If a new key:value pair is being added then it can go either
before or after the spread, but always to be safe the spread should happen first. For arrays it will
just determine the order of values in the array.*/

const updatedUser2 = {
    age: 31,
    ...user, // the incoming user data will override the age to 30
};

const updatedUser3 = {
    email: "John@email.com",
    ...user, // this works just fine because user doest't have an email key
};

const updatedNumbers2 = [...numbers, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
const updatedNumbers3 = [4, 5, 6, ...numbers]; // [4, 5, 6, 1, 2, 3]

/*
One call out which is more common in React, but can be seen in vanilla JS;

Updating nested state or objects with spread.
*/

const [currentUser, setCurrentUser] = useState({
    name: "John",
    address: {
        city: "New York",
        zip: "10001",
    },
});
/*
Suppose we wanted to change the city to "Los Angeles", we don't want to mutate the existing state by
doing something like: currentUser.address.city = "Boston". This will not update the state or trigger
a re-render because the state is still referencing ths same object. React uses Object.is when
deciding whether a state update represents a changed value. If you mutate the existing object and
pass that same object back, React may bail out because the reference hasn't changed.
*/

// The value will be updated however this is the wrong way in react. For vanilla JS this will work
// since we have more control over updating the UI with DOM manipulating methods
currentUser.address.city = "Boston";

/*
end result
{   <------------------------------- same currentUser object
    name: "John",

    address: {  <---------------- same address object
        city: "Boston", <--- new city value
        zip: "10001"
    }
}
*/

// Correct way in React since state needs to view it as a new object
setCurrentUser({
    ...currentUser,

    address: {
        ...currentUser.address,
        city: "Boston",
    },
});

/*
end result
{   <------------------------------- new currentUser object
    name: "John",

    address: {  <---------------- new address object
        city: "Boston", <--- new city value
        zip: "10001"
    }
}
*/

/*
In the correct way, we are updating nested state using the spread operator. We are essentially
creating a new currentUser object with the currentUser data and updating the address value with a
new object as well. This will cause react to update the state value wherever it is used because it
sees a new object being referenced.

Easiest way to remember for an interview

Shallow copy: Copy only the levels necessary for the change. Most common for normal updates and
React state.

Deep copy: Copy the entire nested structure when the new data must be fully independent of the
original.

Memory trick:

- Shallow = copy what changed.
- Deep = separate everything.
*/
