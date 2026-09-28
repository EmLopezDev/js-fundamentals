/* Implementing your own deepClone, this can be handled using recursion

Note:

“This is a simplified deep clone for primitives, arrays, and plain objects. A production
implementation would need to define behavior for things like prototypes, circular references,
built-in object types, property descriptors, and functions. For that you should stick to using
structuredClone() or Lodash's cloneDeep()”
*/
function deepClone(value) {
    // Base case
    if (value === null || typeof value !== "object") {
        return value;
    }
    // Array Check
    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item));
    }
    // Object Check
    const clone = {};

    for (const key in value) {
        clone[key] = deepClone(value[key]);
    }

    return clone;
    /*
    A better version of this would use:
        for (const key of Object.keys(value)) {
            clone[key] = deepClone(value[key]);
        }

    Why?

    for...in
        ↓
    enumerates enumerable string properties
    including inherited enumerable properties

    Object.keys(object)
        ↓
    returns the object's OWN
    enumerable string-keyed properties
    */
}

const original = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy = deepClone(original);

/*
Very detailed walkthrough of what is happening:

DEEP CLONE — STEP-BY-STEP EXECUTION

Given:

const original = {
    name: "John",
    address: {
        city: "New York",
    },
};

const copy = deepClone(original);


And our deepClone function:

function deepClone(value) {
    // Base case: primitives and null
    if (value === null || typeof value !== "object") {
        return value;
    }

    // Arrays
    if (Array.isArray(value)) {
        return value.map((v) => deepClone(v));
    }

    // Objects
    const clone = {};

    for (const key in value) {
        clone[key] = deepClone(value[key]);
    }

    return clone;
}


==================================================
STEP 1 — original is passed into deepClone()
==================================================

We start with:

deepClone(original)

original is an object, so it does NOT meet our base case:

value === null || typeof value !== "object"

It is also not an array:

Array.isArray(original) // false

Therefore, we move to the object section of deepClone() and initialize a new object:

const clone = {};

At this point:

clone = {}

This new object will eventually become our deep copy.

We then begin looping through the properties of original:

for (const key in value)


==================================================
STEP 2 — Process the "name" property
==================================================

The first key is:

"name"

Its value is:

"John"

Our loop executes:

clone[key] = deepClone(value[key]);

Which, for this property, is essentially:

clone["name"] = deepClone("John");

Before "John" is assigned to clone.name, it first gets passed into deepClone().


==================================================
STEP 3 — deepClone("John")
==================================================

A new call to deepClone() begins with:

deepClone("John")

"John" is a primitive string.

Therefore:

typeof "John" !== "object" // true

It meets our base case:

if (value === null || typeof value !== "object") {
    return value;
}

So this call immediately returns:

"John"

We now return to the previous deepClone() call.

The returned value gets assigned to:

clone["name"]

Our outer clone is now:

clone = {
    name: "John"
};


==================================================
STEP 4 — Process the "address" property
==================================================

The loop continues to the next key:

"address"

Its value is:

{
    city: "New York"
}

Our loop executes:

clone["address"] = deepClone(value["address"]);

Which is essentially:

clone["address"] = deepClone({
    city: "New York"
});

Unlike "John", address is an object.

Therefore, it does NOT meet our base case.

It is also not an array.

This means we enter the object section of deepClone() again.


==================================================
STEP 5 — A new clone object is created for address
==================================================

Because address is an object, this recursive call initializes its own new object:

const clone = {};

IMPORTANT:

This is a DIFFERENT clone variable from the clone belonging to the original deepClone(original)
call.

Each recursive function call gets its own local variables.

Conceptually, we currently have:

OUTER CALL:

clone = {
    name: "John"
}

INNER ADDRESS CALL:

clone = {}

The inner call now begins looping through the properties of address:

for (const key in value)


==================================================
STEP 6 — Process the "city" property
==================================================

The first and only key inside address is:

"city"

Its value is:

"New York"

The inner loop executes:

clone["city"] = deepClone("New York");

Before "New York" gets assigned to city, it gets passed into deepClone().


==================================================
STEP 7 — deepClone("New York")
==================================================

A new call begins:

deepClone("New York")

"New York" is a primitive string.

Therefore:

typeof "New York" !== "object" // true

It meets our base case and immediately returns:

"New York"

We return to the address deepClone() call.

The returned value is assigned to:

clone["city"]

The address clone is now:

clone = {
    city: "New York"
};


==================================================
STEP 8 — Return the newly cloned address object
==================================================

There are no more properties inside address.

Therefore, the address call reaches:

return clone;

And returns:

{
    city: "New York"
}

We now go BACK to our original deepClone(original) call.

Remember that the outer call was waiting for this:

clone["address"] = deepClone(value["address"]);

The recursive call has now returned a completely new address object.

Therefore, it becomes the value of:

clone["address"]

Our outer clone is now:

clone = {
    name: "John",
    address: {
        city: "New York"
    }
};


==================================================
STEP 9 — Return the final cloned object
==================================================

We have now processed every property of original.

The outer deepClone() call reaches:

return clone;

It returns:

{
    name: "John",
    address: {
        city: "New York"
    }
}

That returned object gets assigned to:

const copy = deepClone(original);

So copy now contains:

const copy = {
    name: "John",
    address: {
        city: "New York"
    }
};


==================================================
WHY THIS IS A DEEP CLONE
==================================================

original and copy LOOK identical:

original:

{
    name: "John",
    address: {
        city: "New York"
    }
}

copy:

{
    name: "John",
    address: {
        city: "New York"
    }
}

However, they do NOT share object references.

The outer objects are different:

original === copy
// false

The nested address objects are also different:

original.address === copy.address
// false

This is what makes it a deep clone.

A NEW object was created for:

1. The outer object
2. The address object

The primitive values:

"John"
"New York"

do not require cloning because primitives are copied by value.


==================================================
RECURSIVE FLOW
==================================================

The entire process can be visualized like this:

deepClone(original)
│
├── original is an object
│
├── create NEW {}
│
│
├── process "name"
│      │
│      └── deepClone("John")
│             │
│             └── primitive
│                    │
│                    └── return "John"
│
│      clone.name = "John"
│
├── process "address"
│      │
│      └── deepClone(address)
│             │
│             ├── address is an object
│             │
│             ├── create NEW {}
│             │
│             └── process "city"
│                    │
│                    └── deepClone("New York")
│                           │
│                           └── primitive
│                                  │
│                                  └── return "New York"
│
│                    clone.city = "New York"
│
│             return {
│                 city: "New York"
│             }
│
│      clone.address = {
│          city: "New York"
│      }
│
└── return {
        name: "John",
        address: {
            city: "New York"
        }
    }


==================================================
MENTAL MODEL
==================================================

Every time deepClone(value) runs, ask:

1. Is value null or a primitive?

   YES:
   Return the value.

   NO:
   Continue.


2. Is value an array?

   YES:
   Create a new array using map().
   Pass every item through deepClone().

   NO:
   Continue.


3. The value is an object.

   Create a new object:

   const clone = {};


4. Loop through every property.

   For every property:

   clone[key] = deepClone(value[key]);

   This is what makes the operation recursive.


5. Return the newly created object.


==================================================
WHY RECURSION MAKES THE CLONE "DEEP"
==================================================

The important line is:

clone[key] = deepClone(value[key]);

We do NOT simply do:

clone[key] = value[key];

Doing that would copy an object's reference when value[key] contains another object or array,
creating a shallow copy at that level.

Instead, every value is sent back through deepClone().

If it is a primitive:

Return it.

If it is an array:

Create a new array and recursively clone its contents.

If it is an object:

Create a new object and recursively clone its properties.

Because every nested object and array goes through the same process, the function can handle nesting
without us needing to know the depth beforehand.


==================================================
ONE-SENTENCE INTERVIEW EXPLANATION
==================================================

deepClone() recursively walks through a data structure. Primitives and null are returned as-is,
while every object or array causes a new object or array to be created, with each nested value
recursively passed through deepClone() before being assigned to the new structure.


==================================================
MEMORY RULE
==================================================

Primitive / null
    → return the value

Array
    → create a NEW array
    → deepClone every item

Object
    → create a NEW object
    → deepClone every property

In short:

PRIMITIVES → RETURN
ARRAYS     → NEW ARRAY + RECURSE
OBJECTS    → NEW OBJECT + RECURSE

*/
