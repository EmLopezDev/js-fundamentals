/*
When an async action is handed off by the JS environment to the Web API to execute, it's result is
then put into one of the two queues to await execution by the JS engine. Neither queue can be taken
action on until the Call Stack is empty. Once empty the event loop moves tasks one at a time from
the queues into the call stack to be executed prioritizing the microtasks queue over the macrotasks
queue.

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

console.log("1. Start (Sync)");

setTimeout(() => {
    console.log("2. Timeout (Task Queue)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise (Microtask Queue)");
});

queueMicrotask(() => {
    console.log("4. Explicit Microtask");
});

console.log("5. End (Sync)");

/*
1. Start (Sync)
5. End (Sync)
3. Promise (Microtask Queue)
4. Explicit Microtask
2. Timeout (Task Queue)
*/
