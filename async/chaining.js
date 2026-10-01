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
