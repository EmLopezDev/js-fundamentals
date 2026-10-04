/* Implementing your own Promise.all()

Promise.all() takes an iterable of values/promises and returns one Promise that fulfills when all
inputs fulfill, or rejects when any input rejects.
*/

/*
Four behaviors our implementation needs:

Promise.all([ promiseA, promiseB, promiseC ]);

1. Wait for everything - the returned Promise cannot fulfill until all iterable promises are
   fulfilled
2. Preserve input order - it doesn't matter what order the promises complete, promise.all() must
   preserve the order of input.
3. Reject if any input rejects - following fail-fast behavior, if any promise rejects the promise
   returned by promise.all() rejects with that rejected promise's reason. Now that doesn't mean any
   unfinished promise are automatically canceled. They may continue running, their result just won't
   turn the already rejected promise.all() into a fulfillment.
4. Regular values are allowed - meaning the implementation can't assume every item is already a
   Promise. Values like 42 or "hello" are acceptable. We eventually solve this with
   Promise.resolve(value).
5. Returns a Promise - pretty self explanatory but it must return a new Promise
*/

function promiseAll(values) {
    return new Promise((res, rej) => {
        if (values.length === 0) {
            res([]);
            return;
        }
        const results = [];
        let completed = 0;
        values.forEach((value, index) => {
            Promise.resolve(value).then((result) => {
                results[index] = result;
                completed++;

                if (completed === values.length) {
                    res(results);
                }
            }, rej);
        });
    });
}

/*
Note: In promiseAll(), each .then() callback forms a closure over its surrounding lexical scope. It
retains its iteration's index from the forEach() callback while also sharing access to results and
completed from the outer Promise callback. This allows asynchronous callbacks to execute later while
still knowing where to store their result and how many inputs have completed.
*/

const promiseA = new Promise((resolve) => {
    setTimeout(() => resolve("A"), 3000);
});

const promiseB = new Promise((resolve) => {
    setTimeout(() => resolve("B"), 1000);
});

const promiseC = new Promise((resolve) => {
    setTimeout(() => resolve("C"), 2000);
});

const finalPromise = promiseAll([promiseA, promiseB, promiseC]);

/*
PROMISE.ALL — COMPLETE STEP-BY-STEP EXECUTION WALKTHROUGH
=========================================================

OUR IMPLEMENTATION
------------------

function promiseAll(values) {
  return new Promise((resolve, reject) => {

    if (values.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completed = 0;

    values.forEach((value, index) => {

      Promise.resolve(value).then(
        (result) => {
          results[index] = result;
          completed++;

          if (completed === values.length) {
            resolve(results);
          }
        },
        reject
      );

    });
  });
}


EXAMPLE
-------

const promiseA = new Promise((resolve) => {
  setTimeout(() => resolve("A"), 3000);
});

const promiseB = new Promise((resolve) => {
  setTimeout(() => resolve("B"), 1000);
});

const promiseC = new Promise((resolve) => {
  setTimeout(() => resolve("C"), 2000);
});

const finalPromise = promiseAll([
  promiseA,
  promiseB,
  promiseC
]);


EXPECTED FINAL RESULT
---------------------

["A", "B", "C"]


Even though the Promises finish in this order:

B → C → A

promiseAll() preserves the ORIGINAL INPUT ORDER:

A → B → C


=========================================================
STEP 1 — promiseAll() IS CALLED
=========================================================

We call:

promiseAll([
  promiseA,
  promiseB,
  promiseC
]);

Inside promiseAll:

values = [
  promiseA,
  promiseB,
  promiseC
]

values.length === 3


=========================================================
STEP 2 — CREATE THE OUTER PROMISE
=========================================================

JavaScript reaches:

return new Promise((resolve, reject) => {
  ...
});

A NEW Promise is created.

This is important:

promiseA
promiseB
promiseC

are the INPUT Promises.

The Promise created by:

new Promise(...)

is the OUTER Promise that promiseAll() returns.

Think of it like:

INPUTS:

promiseA ─┐
promiseB ─┼──→ promiseAll() ───→ OUTER PROMISE
promiseC ─┘


The outer Promise will eventually:

FULFILL → if every input fulfills

or

REJECT → if any input rejects.


=========================================================
STEP 3 — CHECK FOR AN EMPTY ARRAY
=========================================================

JavaScript executes:

if (values.length === 0) {
  resolve([]);
  return;
}

But:

values.length === 3

so:

3 === 0 → false

We skip this block.

Why does this check exist?

If values were:

[]

forEach() would have nothing to iterate over.

That means our normal:

resolve(results)

would never be reached.

Without the special case:

promiseAll([])

would remain pending forever.

Instead:

promiseAll([])

should fulfill with:

[]


=========================================================
STEP 4 — CREATE SHARED STATE
=========================================================

JavaScript executes:

const results = [];
let completed = 0;

Current state:

results = []

completed = 0


These variables belong to the lexical scope of the
outer Promise callback.

The asynchronous .then() callbacks we create later
will form closures that allow them to continue
accessing these variables.

Most importantly:

ALL of the fulfillment callbacks share the SAME:

results
completed


=========================================================
STEP 5 — forEach() STARTS
=========================================================

JavaScript executes:

values.forEach((value, index) => {
  ...
});

We have three values, so the callback executes
three times.

Conceptually:

ITERATION 1

value = promiseA
index = 0


ITERATION 2

value = promiseB
index = 1


ITERATION 3

value = promiseC
index = 2


Each iteration has its own value and index.

But all three eventually access the same:

results
completed


=========================================================
STEP 6 — ITERATION 1: promiseA
=========================================================

First iteration:

value = promiseA
index = 0

JavaScript executes:

Promise.resolve(value)

which is effectively:

Promise.resolve(promiseA)

Since promiseA is already a Promise, Promise.resolve()
allows us to work with it through the same Promise-based
path.

Then we attach:

.then(
  (result) => {
    ...
  },
  reject
);


IMPORTANT:

The fulfillment callback DOES NOT execute yet.

We are REGISTERING the callback that should execute
when promiseA fulfills.

Conceptually:

promiseA
   │
   └── when fulfilled
            ↓
       run this callback


The callback also remembers:

index = 0

through closure.


=========================================================
STEP 7 — ITERATION 2: promiseB
=========================================================

Second iteration:

value = promiseB
index = 1

Again:

Promise.resolve(promiseB)

and a fulfillment callback is registered.

That callback remembers:

index = 1


=========================================================
STEP 8 — ITERATION 3: promiseC
=========================================================

Third iteration:

value = promiseC
index = 2

Again:

Promise.resolve(promiseC)

and another fulfillment callback is registered.

That callback remembers:

index = 2


=========================================================
STEP 9 — forEach() FINISHES
=========================================================

At this point, NONE of our example Promises have
finished yet.

Our state is still:

results = []

completed = 0


But we now have three fulfillment callbacks waiting:

promiseA → callback remembering index 0

promiseB → callback remembering index 1

promiseC → callback remembering index 2


All three callbacks also have access to the shared:

results
completed


=========================================================
STEP 10 — promiseAll() RETURNS
=========================================================

The synchronous setup work is finished.

promiseAll() returns the OUTER Promise.

So:

const finalPromise = promiseAll(...);

means:

finalPromise = outer Promise


But it is currently:

PENDING


Why?

Because none of the input Promises have fulfilled yet.

The function call itself has finished, but the closures
created earlier keep the necessary variables accessible.

This is an important distinction:

promiseAll() has returned

BUT

the Promise returned by promiseAll() has NOT settled yet.


=========================================================
STEP 11 — 1000ms: promiseB FULFILLS FIRST
=========================================================

promiseB finishes with:

"B"


Its fulfillment handler is scheduled through the
Promise microtask mechanism.

When that callback executes:

result = "B"

And remember:

this callback's index = 1


It executes:

results[index] = result;

which becomes:

results[1] = "B";


Current results:

[
  empty,
  "B"
]


Notice:

We DO NOT do:

results.push("B");


If we used push(), B would become the first result
simply because B finished first.

That would incorrectly produce completion order.

Instead:

results[index] = result

uses the ORIGINAL INPUT POSITION.


Then:

completed++;

changes:

completed = 0

to:

completed = 1


Now:

if (completed === values.length)

becomes:

if (1 === 3)

which is:

false


So we DO NOT resolve yet.


CURRENT STATE:

results = [
  empty,
  "B"
]

completed = 1

outer Promise = PENDING


=========================================================
STEP 12 — 2000ms: promiseC FULFILLS SECOND
=========================================================

promiseC finishes with:

"C"


Its fulfillment callback eventually executes.

For this callback:

result = "C"

index = 2


JavaScript executes:

results[index] = result;

which becomes:

results[2] = "C";


Now:

results = [
  empty,
  "B",
  "C"
]


Then:

completed++;

changes:

completed = 1

to:

completed = 2


Then:

if (completed === values.length)

becomes:

if (2 === 3)

false


Still not finished.


CURRENT STATE:

results = [
  empty,
  "B",
  "C"
]

completed = 2

outer Promise = PENDING


=========================================================
STEP 13 — 3000ms: promiseA FULFILLS LAST
=========================================================

promiseA finally fulfills with:

"A"


Its fulfillment callback executes.

For this callback:

result = "A"

index = 0


JavaScript executes:

results[index] = result;

which becomes:

results[0] = "A";


Now:

results = [
  "A",
  "B",
  "C"
]


Then:

completed++;

changes:

completed = 2

to:

completed = 3


Now we check:

if (completed === values.length)

which becomes:

if (3 === 3)

TRUE


Therefore:

resolve(results);


executes.


=========================================================
STEP 14 — THE OUTER PROMISE FULFILLS
=========================================================

The outer Promise returned by promiseAll() now fulfills
with:

[
  "A",
  "B",
  "C"
]


So:

finalPromise

changes from:

PENDING

to:

FULFILLED


with the fulfillment value:

["A", "B", "C"]


=========================================================
WHY THE ORDER IS CORRECT
=========================================================

The actual completion order was:

B → C → A


But each callback remembered its ORIGINAL index:

A → index 0
B → index 1
C → index 2


Therefore:

B finishes:
results[1] = "B"

C finishes:
results[2] = "C"

A finishes:
results[0] = "A"


Final result:

["A", "B", "C"]


The order in which Promises finish DOES NOT determine
their position in the results array.

Their original input index determines their position.


=========================================================
WHY completed IS NECESSARY
=========================================================

The results array tells us:

WHERE each result belongs.


But we also need to know:

WHEN everything is finished.


That's what:

completed

does.


After B:

completed = 1


After C:

completed = 2


After A:

completed = 3


Then:

completed === values.length

3 === 3

tells us:

EVERY input has successfully fulfilled.


So:

index     → WHERE does the result belong?

completed → HOW MANY inputs have fulfilled?


=========================================================
WHY THE COMPLETION CHECK MUST BE INSIDE .then()
=========================================================

This is important.

Correct:

Promise.resolve(value).then((result) => {

  results[index] = result;
  completed++;

  if (completed === values.length) {
    resolve(results);
  }

});


The check must happen AFTER a Promise fulfills.

If we instead wrote:

Promise.resolve(value).then((result) => {
  results[index] = result;
  completed++;
});

if (completed === values.length) {
  resolve(results);
}


the if statement would execute immediately while
forEach() is still synchronously running.

At that time:

completed = 0


The .then() callbacks execute LATER.

So we'd check:

0 === 3
0 === 3
0 === 3

and then finish the loop.


Later:

B → completed = 1
C → completed = 2
A → completed = 3


But there would be no completion check anymore.

The outer Promise would remain pending forever.


=========================================================
HOW CLOSURE IS BEING USED
=========================================================

Each .then() fulfillment callback is a closure.

For example:

(result) => {
  results[index] = result;
  completed++;
}


Even though this callback executes later, it can still
access variables from its surrounding lexical scopes.


Each callback retains its own iteration's:

index


But all callbacks share:

results
completed


Conceptually:

CALLBACK FOR A

index = 0 ──────────┐
                    │
                    ├──→ shared results
                    └──→ shared completed


CALLBACK FOR B

index = 1 ──────────┐
                    │
                    ├──→ shared results
                    └──→ shared completed


CALLBACK FOR C

index = 2 ──────────┐
                    │
                    ├──→ shared results
                    └──→ shared completed


That's why asynchronous callbacks can execute much later
and still know:

1. WHERE their result belongs
2. HOW MANY total inputs have completed


=========================================================
WHAT Promise.resolve(value) IS DOING
=========================================================

Our implementation shouldn't assume every input is
already a Promise.

For example:

promiseAll([
  Promise.resolve("A"),
  42,
  "Hello"
]);


The values:

42
"Hello"

are regular values.


Promise.resolve(42)

produces a fulfilled Promise representing:

42


Promise.resolve("Hello")

produces a fulfilled Promise representing:

"Hello"


Now everything can use the same:

.then(...)

logic.


Conceptually:

Promise input
      ↓
Promise.resolve(value)
      ↓
work with it as a Promise


Regular value
      ↓
Promise.resolve(value)
      ↓
work with it as a Promise


This NORMALIZES the inputs so our implementation can
handle them through one consistent Promise-based path.


Even when Promise.resolve() receives a regular value,
the .then() fulfillment handler still runs
asynchronously through the microtask queue.


=========================================================
WHAT HAPPENS IF SOMETHING REJECTS?
=========================================================

Remember this part:

Promise.resolve(value).then(
  (result) => {
    ...
  },
  reject
);


The second argument to .then():

reject

is our rejection handler.


Imagine:

A fulfills at 300ms
B rejects at 500ms with "Network error"
C fulfills at 1000ms


At 300ms:

A fulfills.

results[0] = "A"

completed = 1


At 500ms:

B rejects.


Instead of the fulfillment callback running,
our rejection handler runs:

reject("Network error");


That rejects the OUTER Promise.


So:

outer Promise

changes:

PENDING
   ↓
REJECTED


with:

"Network error"


=========================================================
WHAT HAPPENS TO C?
=========================================================

C is NOT automatically cancelled.

It can continue doing whatever asynchronous work
it was already doing.

At 1000ms it may still fulfill.


Its fulfillment callback may still execute and do:

results[2] = "C";
completed++;


But the outer Promise has already been:

REJECTED


A Promise can only settle ONCE.

Once rejected, later calls to:

resolve(...)

cannot change it back to fulfilled.


So Promise.all has "fail-fast" result behavior,
but that does NOT mean it automatically cancels
the underlying operations.


=========================================================
THE ENTIRE FLOW IN ONE PICTURE
=========================================================

INPUT:

[
  promiseA,   // index 0 — finishes at 3000ms
  promiseB,   // index 1 — finishes at 1000ms
  promiseC    // index 2 — finishes at 2000ms
]

                    │
                    ▼

              promiseAll()

                    │
                    ▼

          Create outer Promise

                    │
                    ▼

             results = []
             completed = 0

                    │
                    ▼

          Register callbacks for:

          A → remembers index 0
          B → remembers index 1
          C → remembers index 2

                    │
                    ▼

          Return outer Promise

              PENDING...

                    │
        ┌───────────┼───────────┐
        │           │           │
      1000ms      2000ms      3000ms
        │           │           │
        ▼           ▼           ▼
        B           C           A
        │           │           │
        ▼           ▼           ▼
 results[1]="B" results[2]="C" results[0]="A"
        │           │           │
        ▼           ▼           ▼
 completed=1   completed=2   completed=3
        │           │           │
        ▼           ▼           ▼
      1===3       2===3       3===3
      false       false        TRUE
                                  │
                                  ▼
                         resolve(results)
                                  │
                                  ▼
                      ["A", "B", "C"]
                                  │
                                  ▼
                       OUTER PROMISE
                          FULFILLED


=========================================================
THE THREE MOST IMPORTANT VARIABLES
=========================================================

value

→ What input are we currently processing?


index

→ Where does this input belong in the final array?


completed

→ How many inputs have successfully fulfilled?


And:

results

→ The shared array where fulfillment values are stored.


=========================================================
CORE MENTAL MODEL
=========================================================

promiseAll(values)

        ↓

Create an outer Promise

        ↓

Create:

results = []
completed = 0

        ↓

For every input:

Promise.resolve(value)

        ↓

Wait for fulfillment or rejection

        ↓

FULFILLED?

Store:

results[index] = result

Then:

completed++

Then ask:

completed === values.length?

NO  → keep waiting

YES → resolve(results)


REJECTED?

reject outer Promise


=========================================================
ONE-SENTENCE INTERVIEW EXPLANATION
=========================================================

"A simplified Promise.all implementation creates a new
Promise, normalizes each input with Promise.resolve(),
stores each fulfillment value at its original index,
tracks the number of completed inputs, resolves with the
ordered results once all inputs fulfill, and rejects the
returned Promise if any input rejects."


=========================================================
MEMORY VERSION
=========================================================

Promise.all needs to remember three things:

1. WHERE?
   → index

2. HOW MANY?
   → completed

3. WHAT RESULTS?
   → results


index preserves order.

completed tells us when everything is done.

results stores the final values.


And Promise.resolve() lets Promises and regular values
follow the same path.
*/
