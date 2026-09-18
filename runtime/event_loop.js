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
