/*
The JavaScript optional chaining operator (?.) allows you to safely access deeply nested object
properties, arrays, or functions without having to manually validate that each reference in the
chain exists. If a reference is null or undefined, the expression short-circuits and immediately
returns undefined instead of throwing a runtime.


Before optional chaining was introduced in ECMAScript 2020, checking a deeply nested property
required verbose conditional logic to avoid errors like "Cannot read properties of undefined"
*/

// Old way: Verbose logical AND checks
const userCity1 = user && user.address && user.address.city;

// New way: Clean optional chaining
const userCity2 = user?.address?.city;

// Object example
const user = { name: "Alice" };

console.log(user.address.city); // Throws TypeError
console.log(user?.address?.city); // Returns undefined

// Array example
const users = null;
console.log(users?.[0]); // Returns undefined

const propertyName = "email";
console.log(user?.[propertyName]); // Returns undefined if user is missing

// Function method example
const apiResponse = {
    logData: () => console.log("Success!"),
};

apiResponse.logData?.(); // Runs successfully
apiResponse.fetchData?.(); // Safely returns undefined (doesn't crash)
// If the property exists but isn't a function, Javascript will throw a TypeError

/*
A few things to keep in mind

- Short-Circuit Behavior: As soon as the operator encounters a nullish value, the rest of the
expression to the right is completely skipped.
- Left-Hand Side Restrictions: You cannot use optional chaining to assign a value to a variable or
property. For example, user?.address?.city = "New York" will result in a SyntaxError.
- Root Objects: The root object itself must be declared. If you try to check nonExistentVar?.prop on
a variable that hasn't even been declared in scope, you will get a ReferenceError.

*/
