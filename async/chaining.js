/*
The single most important rule is:

Every call to .then() returns a brand-new Promise.
*/

const p1 = Promise.resolve(5);

const p2 = p1.then((value) => {
    return value * 2;
});

/*
p1
↓
Promise fulfilled with 5

        .then(...)
            ↓

p2
↓
NEW Promise

p2 is not p1

p2's state is determined by the result of the callback passed to .then(), because the callback
returned the normal value 10, the new Promise returned by .then() fulfills with 10.

p1
Promise fulfilled: 5
        │
        ↓
     .then()
        │
        ↓
 callback receives 5
        │
        ↓
   return 10
        │
        ↓
p2
Promise fulfilled: 10
*/

// Why this creates a chain
Promise.resolve(5)
    .then((value) => {
        return value * 2;
    })
    .then((value) => {
        return value + 10;
    })
    .then((value) => {
        console.log(value);
    });

/*
It looks like one Promise flowing through several .then() calls but really its:

Promise #1
fulfilled: 5
    │
    │ .then()
    ↓
return 10
    │
    ↓
Promise #2
fulfilled: 10
    │
    │ .then()
    ↓
return 20
    │
    ↓
Promise #3
fulfilled: 20
    │
    │ .then()
    ↓
console.log(20)
    │
    ↓
Promise #4

Each .then() is attached to the Promise returned by the previous .then()
*/

// The rules to remember: What callback does determines what happens to newPromise.
const newPromise = oldPromise.then(callback);

// Returning a normal value
const p3 = Promise.resolve(5);

const promise4 = p3.then((value) => {
    return value * 3;
});
/*
- callback returns normal value -> new Promise fulfills with that value

If a .then() callback returns a normal value, the new Promise returned by .then() fulfills with that
value.
*/

// Rule 1. callback returns another Promise -> new Promise waits for/adopts that Promise
const p5 = Promise.resolve(5);

const p6 = p5.then((value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value + 10);
        }, 1000);
    });
});

p6.then((value) => {
    console.log(value);
});

/*
.then() returns a new Promise. If the .then() callback returns another Promise, the Promise returned
by .then() waits for and adopts the eventual state of the Promise returned by the callback.

for this example p5 passes its fulfillment value of 5 to the .then() callback. .then() returns a new
Promise, which is p6. If the callback returns another Promise, p6 waits for and adopts that returned
Promise's eventual state and result.
*/

// Rule 2. callback returns nothing -> new Promise fulfills with undefined
const p7 = Promise.resolve(10);

const p8 = p7.then((value) => {
    console.log(value * 2);
});

const p9 = p8.then((value) => {
    console.log(value);
});

/*
if .then() returns nothing explicitly then it implicitly returns undefined.

in the example above the console.logs are 20 then undefined. p7 passes 10 to p8, since p8 returned
nothing it is fulfilled with undefined which gets passed to p9 and logs undefined, but both p8 and
p9 are fulfilled with undefined because neither one returns anything.
*/

// Rule 3. callback throws an error -> new Promise rejects with that error
const p10 = Promise.resolve(5);

const p11 = p10.then((value) => {
    // Promise chaining automatically turns the thrown Error into a rejection
    throw new Error("Something went wrong");
});

const p12 = p11.catch((error) => {
    // catch also returns a new Promise and because there is no return p12 fulfills with undefined
    console.log(error.message);
});

/*
If a .then() callback throws an error, the new Promise returned by .then() becomes rejected with
that error.
*/

// Rule 4. callback returns a rejected Promise -> new Promise adopts that rejection
const p13 = Promise.resolve(5);

const p14 = p13.then((value) => {
    return Promise.reject(new Error("Boom"));
});

/*
.then() returns a new Promise. If the .then() callback returns another Promise that is rejected, the
Promise returned by .then() waits for and adopts the rejection of the Promise returned by the
callback. Same concept as rule 2
*/

/*
.catch() can recover the chain

.catch() also returns a new Promise, and what its callback returns determines the state/value of
that new Promise. A .catch() doesn't mean the rest of the chain stays rejected. If the .catch()
callback completes normally and returns a normal value, the new Promise returned by .catch() is
fulfilled with that value.

Same rules as .then() apply to .catch()
*/
const p15 = Promise.reject(new Error("Something failed"));

const p16 = p15.catch((error) => {
    console.log(error.message);
    return 100;
});

const p17 = p16.then((value) => {
    return value * 2;
});

/*
What if .catch() fails?

Returning a normal value from .catch() recovers the chain but .catch() follows the same
Promise-chain rules as .then(). So if the .catch() callback throws another error, the Promise
returned by .catch() becomes rejected.
*/

const p18 = Promise.reject(new Error("Original error"));

const p19 = p18.catch((error) => {
    throw new Error("New error");
});

/*
p18 -> rejected: "Original error"
p19 -> rejected "New error"

because p18.catch() caught the error from p18 it doesn't get passed along to p19, but since .catch()
threw a new error, p19 becomes rejected with that new error.
*/

/*
Rejection Propagation

Rejections skip fulfillment handler
*/

const p20 = Promise.reject(new Error("Failed"));

const p21 = p20.then((value) => {
    return value * 2;
});

/*
If a Promise is rejected and the next .then() has no rejection handler, its fulfillment callback is
skipped and the rejection propagates to the new Promise.
*/

const p22 = Promise.resolve(10);

const p23 = p22.then((value) => {
    throw new Error("Oops");
});

const p24 = p23.then((value) => {
    return value * 2;
});

const p25 = p24.then((value) => {
    return value + 5;
});

const p26 = p25.catch((error) => {
    return 100;
});

/*
p22 → FULFILLED
      value: 10
         ↓
p23 → REJECTED
      reason: Error("Oops")
         ↓
p24 → REJECTED
      reason: Error("Oops")
      fulfillment callback skipped
         ↓
p25 → REJECTED
      reason: Error("Oops")
      fulfillment callback skipped
         ↓
p26 → FULFILLED
      value: 100
*/

/*
-- onFulfilled & onRejection --

.then() can actually accept two callbacks .then(onFulfilled, onRejected)

Think:

promise settles
     │
     ├── FULFILLED ──→ onFulfilled(value)
     │
     └── REJECTED ───→ onRejected(reason)
*/

const p27 = Promise.reject(new Error("Failed"));

const p28 = p27.then(
    (value) => {
        console.log("Success:", value);
    },
    (error) => {
        console.log("Error:", error.message);
    },
);

/*
since p27 was rejected the first callback doesn't run but the second one does handling the rejection

.catch() conceptually is just .then(undefined, onRejection)
*/

const p29 = Promise.resolve(5);

/* p29 is fulfilled therefore the .then() handles the fulfilled promise, the error thrown by the
.then() isn't caught by p29.then(onRejection), the new Promise returned to p30 gets rejected so
either p30.then(onRejection) or p30.catch() will handle that rejection as shown*/
const p30 = p29.then(
    (value) => {
        throw new Error("Boom");
    },
    (error) => {
        console.log("Caught:", error.message);
    },
);

const p31 = Promise.resolve(5);

// p32 is the rejected promise returned by p31 and is handled in the next step with p32.catch()
const p32 = p31.then((value) => {
    throw new Error("Boom");
});

const p33 = p32.catch((error) => {
    console.log("Caught:", error.message);
});

/*
The onRejected handler only handles a rejection coming into that .then(); if onFulfilled runs and
throws an error, that error rejects the new Promise returned by .then() and is not caught by the
sibling onRejected.
*/

/*
-- .finally() --

.finally() is used for code that should run whether the Promise fulfills or rejects.
*/

const p34 = Promise.resolve(10);

const p35 = p34.finally(() => {
    console.log("Cleanup");
});

/*
p34 → FULFILLED: 10
        ↓
     .finally()
        ↓
   logs "Cleanup"
        ↓
p35 → FULFILLED: 10
*/

const p36 = Promise.reject(new Error("Failed"));

const p37 = p36.finally(() => {
    console.log("Cleanup");
});

/*
p36 → REJECTED: Error("Failed")
        ↓
     .finally()
        ↓
   logs "Cleanup"
        ↓
p37 → REJECTED: Error("Failed")

Normally, .finally() is not trying to transform the value or recover from an error.
*/

// Normal use case
showLoadingSpinner();

fetchData()
    .then(handleData)
    .catch(handleError)
    .finally(() => {
        hideLoadingSpinner();
    });
// Whether the request succeeds or fails the cleanup .finally still happens.

/*
One important rule about .finally()

.finally() normally preserves the original Promise's state and value/reason. Normal return values
are ignored, but if the .finally() callback throws or returns a rejected Promise, the new Promise
becomes rejected with that new error/reason.
*/

// Example
const p38 = Promise.resolve(10);

const p39 = p38.finally(() => {
    return 100;
});

/*
Your might expect p39 → fulfilled with 100 based on what we have learned but that's not what
normally happens instead:

p38 → fulfilled with 10
        ↓
.finally()
        ↓
return 100
        ↓
100 is normally ignored
        ↓
p39 → fulfilled with 10

There is an exception to this which is what if .finally() didn't complete successfully and throws
an Error or returns a Promise
*/

const p40 = Promise.resolve(25);

const p41 = p40.finally(() => {
    throw new Error("Cleanup failed");
});
/*
Here the .finally() failed itself. This failure becomes the outcome of the chain

p40 → fulfilled: 25
        ↓
.finally()
        ↓
throws Error("Cleanup failed")
        ↓
original fulfillment is replaced
        ↓
p41 → REJECTED: Error("Cleanup failed")
*/

const p42 = Promise.resolve(25);

const p43 = p42.finally(() => {
    return Promise.reject(new Error("Cleanup failed"));
});

/*
Same goes for a rejected promise

p42 → fulfilled: 25
        ↓
.finally()
        ↓
returns rejected Promise
        ↓
p43 → REJECTED: Error("Cleanup failed")
*/

const p44 = Promise.resolve(25);

const p45 = p44.finally(() => {
    return Promise.resolve(100);
});

/*
If .finally returns a fulfilled Promise however, it waits for the Promise to fulfill but just like
before 100 doesn't replace 25. 100 essentially gets discarded in this example and 25 continues
being the fulfilled value

p58 → fulfilled: 25
        ↓
.finally()
        ↓
returns Promise fulfilled with 100
        ↓
cleanup succeeds
        ↓
p59 → fulfilled: 25
*/
