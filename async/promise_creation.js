/*
A JavaScript Promise is an object representing the eventual completion or failure of an
asynchronous operation and it's resulting value. Think of it as a placeholder for a value
that is not yet known when the promise is created.

Promises have 3 states:
- Pending: the initial state. The async operation is still actively running.
- Fulfilled: the async operation completed successfully and now contains the resulting value.
- Rejected: The operation failed and contains the reason or error for the failure.

Note: Once a promise moves from pending to either fulfilled or rejected it is considered settled
and its state can never change again.
*/

/*
Creating a Promise

You can create a promise using the new Promise() constructor. It takes a function (called the
executor) with two built-in callback arguments: resolve and reject.
*/

const checkServerStatus = new Promise((resolve, reject) => {
    let success = true; // Simulating an operation

    if (success) {
        resolve("Server is running smoothly!"); // Moves state to Fulfilled
    } else {
        reject("Server is down."); // Moves state to Rejected
    }
});

/*
Before promises, JavaScript relied heavily on passing functions into other functions (callbacks).
When nesting multiple asynchronous steps together, this created messy, unreadable code often called
"Callback Hell."

Promises allow you to chain operations sequentially, making complex asynchronous
structures vastly easier to read, maintain, and debug.
*/

/*
Modern Async Utilities and Edge Cases

Memory Leaks and AbortController: Promises cannot be natively "canceled" once started. To stop a
pending network request or async chain mid-flight, developers use AbortController passed into
standard fetch configurations.

Async Generators and for await...of: Used for handling asynchronous data streams (like chunked data
from a file stream or a paginated API loop) sequentially.

The "Unhandled Rejection" Trap: If a promise rejects and there is no .catch() block attached
anywhere in the active call stack, it throws a global environment error. Production systems require
global listeners (process.on('unhandledRejection') in Node.js or
window.addEventListener('unhandledrejection') in browsers) to log these gracefully.
*/
