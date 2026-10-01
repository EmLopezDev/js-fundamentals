// ASYNC/AWAIT — WHAT HAPPENS BEHIND THE SCENES

// Example:

async function getData() {
    console.log("A");

    const value = await Promise.resolve(10);

    console.log("B", value);

    return value * 2;
}

console.log("C");

const result = getData();

console.log("D");

result.then((value) => {
    console.log("E", value);
});

/*
OUTPUT:
C
A
D
B 10
E 20


STEP-BY-STEP:

1. console.log("C") runs synchronously.
   → Prints "C".

2. getData() is called.
   → Because async functions begin executing synchronously,
     console.log("A") runs immediately.
   → Prints "A".

3. getData() reaches:
   await Promise.resolve(10)

   → await suspends the rest of getData().
   → It does NOT block the main thread.
   → The continuation of getData() will resume through the
     microtask mechanism once the awaited Promise is fulfilled.

4. Even though getData() is suspended, it immediately returns
   its own Promise.

   result → Promise { pending }

5. JavaScript continues running synchronous code.
   → console.log("D")
   → Prints "D".

6. result.then(...) is called while result is still pending.

   IMPORTANT:
   The .then() callback does NOT go into the microtask queue yet.

   Instead, .then() registers a reaction with the result Promise.

   result Promise
       └── registered .then reaction

7. The current synchronous work finishes and the call stack
   becomes empty.

8. Because the Promise being awaited is fulfilled, the continuation
   of getData() resumes through the microtask mechanism.

   value = 10

   → console.log("B", value)
   → Prints "B 10".

9. getData() reaches:
   return value * 2

   → return 20

   Because getData() is async, this fulfills the Promise that was
   returned earlier:

   result:
   Promise { pending }
          ↓
   Promise { fulfilled: 20 }

10. result now has a fulfillment value.

    The .then() reaction that was previously registered with result
    becomes eligible and is scheduled as a microtask.

11. The .then() callback runs and receives result's fulfillment value:

    value = 20

    → console.log("E", value)
    → Prints "E 20".


MENTAL MODEL:

Call async function
        ↓
Function starts synchronously
        ↓
Hits await
        ↓
Async function suspends
        ↓
Its Promise is returned immediately as pending
        ↓
.then() can register a reaction with that pending Promise
        ↓
Synchronous code finishes
        ↓
Async function resumes through microtask mechanism
        ↓
Function eventually returns a value
        ↓
Its returned Promise fulfills with that value
        ↓
Registered .then() reaction becomes eligible
        ↓
.then() callback is scheduled as a microtask
        ↓
.then() callback executes


IMPORTANT RULES:

• An async function ALWAYS returns a Promise.

• An async function starts executing synchronously.

• await suspends the async function, NOT the entire JavaScript thread.

• The async function's Promise is returned even while the function
  is suspended.

• The Promise remains pending until the async function completes.

• When the awaited Promise is ready, the async function continues
  through the microtask mechanism.

• Returning a value from an async function fulfills its Promise
  with that value.

• .then() on a pending Promise registers a reaction with the Promise.

• A .then() callback does NOT sit in the microtask queue while the
  Promise is pending.

• Once the Promise settles, its registered reaction becomes eligible
  and is scheduled as a microtask.


ONE-LINE SUMMARY:

async call → Promise returned → await suspends function →
Promise stays pending → function resumes via microtask →
function returns value → Promise fulfills →
.then reaction becomes microtask → .then callback runs
*/
