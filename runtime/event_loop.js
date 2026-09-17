/*
In JavaScript the even loop works in conjunction with the engine to be able to perform non-blocking
or asynchronous operations despite being a single-threaded language.

The event loop's main job is to monitor and direct tasks into the call stack that have been handed
off to Web API's. The event loop cannot do its job however if the call stack is still executing
operations. Once the callstack is empty the event loop gets to work by prioritizing micro tasks over
macro tasks one at a time via a FIFO structure. Each tasks gets moved into the call stack one at a
time, once a task is in the call stack the event loop goes idle and the engine executes the task,
once done it pops it off the call stack, then the event loop activates again, checks the queues and
moves the next task into the call stack if there are any.
*/

console.log("1. Start");

setTimeout(() => {
    console.log("2. Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise");
});

console.log("4. End");

/* Result
1. Start
4. End
3. Promise
2. Timeout

Why this happens:
1. console.log("1. Start") runs immediately on the Call Stack.
2. setTimeout is handed off to the Web API environment. Because its timer is 0ms, its callback
immediately  drops ino the macro task/callback queue.
3. Promise.resolve() finishes immediately, sending its .then() callback to the micro tasks queue.
4. console.log("4. End") runs on the Call Stack.
5. The Call Stack is now empty. The event loop checks the micro task queue first, pulling and
executing the Promise's .then() call back so console.log("3. Promise") gets ran.
6.With the micro task queue now empty, the event loop checks the micro task queue pulling and
executing the timeout callback, so console.log("2. Timeout") gets ran.
*/

/*
EXTRA:

1. The Macro task Queue (often called the Task Queue or Callback Queue)

This queue holds tasks that are scheduled by the host environment's APIs. They represent heavy,
distinct operations.

- setTimeout() and setInterval() callbacks.
- UI/DOM events (e.g., a user click, scroll, or keydown event handler).
- Network I/O (e.g., the final callback triggered when a fetch request or XMLHttpRequest completes).
- File system I/O (primarily in Node.js).
- setImmediate() (Node.js specific).
- Parsing HTML or executing an entire <script> tag.

Why Macrotasks Exist: They force heavy or external tasks to execute one at a time per loop cycle,
allowing the single-threaded browser to pause, re-render, and stay responsive between tasks.

2. The Microtask Queue

This queue holds tasks that are spawned from within the JavaScript language runtime itself, usually
to handle the immediate results of asynchronous operations.

- Promise callbacks (anything inside a .then(), .catch(), or .finally()).
- async/await continuations (the code that executes after an await line expression resolves).
- queueMicrotask() (the explicit native API used to manually queue a microtask).
- MutationObserver callbacks (used by browsers to detect changes to the DOM tree).
- process.nextTick() (Node.js specific—technically sits in a specialized queue that runs even faster
  than standard microtasks).

Why Microtasks Exist: They run immediately after synchronous code to finish urgent data and state
updates before the browser can re-render or accept user input, keeping the UI consistent.
*/
