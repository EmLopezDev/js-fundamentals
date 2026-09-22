/*
Throttling is a performance optimization technique in JavaScript that limits how often a function
can execute within a given timeframe. The browser can if not careful trigger dozens of high
frequency events such as window scrolling, resizing, or mouse events. This can lead to poor
performance therefore a poor user experience. Throttling is one way of solving this issue by forcing
the action to run at a regular controlled interval, ignoring any intermediate triggers.

Think of throttling like a traffic light on a highway on-ramp. Even if a massive line of 100 cars
arrives all at once, the light only lets one car through every 10 seconds. The rest of the cars have
to wait their turn; the flow is kept at a strictly regulated pace.

Not to be confused with debounce which is similar but instead of waiting for a delay in activity or
a pause before firing off the action, instead it firing off an action once per fixed interval.

- Throttling: "You can keep going, but I'll only respond every so often."
- Debounce: "Wait until you're done."

Common Use Cases

- Infinite Scroll / Pagination: Checking how close a user is to the bottom of the page to fetch more
  data.
- Resizing Layouts: Recalculating grid layouts or re-rendering components smoothly when a user
  resizes their browser window.
- Game Loop Interactions: Throttling button-mashing actions (like checking if a character can fire a
  weapon) so a user can't spam an action faster than intended.
- Mouse Tracking: Updating visual elements based on mouse movements or hover coordinates.
*/

/*
Implementation Examples

There are two primary ways to write a custom throttle function in JavaScript:
- using a boolean flag with setTimeout
- using a timestamp comparison.
*/

// The boolean flag example
function throttle(fn, delay) {
    let isThrottled = false;

    return function (...args) {
        // If the lock is active, ignore the function call
        if (isThrottled) return;

        // Execute the main function immediately
        fn.apply(this, args);

        // Activate the lock
        isThrottled = true;

        // Remove the lock after the specified delay
        setTimeout(() => {
            isThrottled = false;
        }, delay);
    };
}

// Usage Example:
const handleScroll = throttle(() => {
    console.log("Scroll event processed at:", new Date().toLocaleTimeString());
}, 1000);

window.addEventListener("scroll", handleScroll);

/* handleScroll = (...args){
        if (isThrottled) return;

        fn.apply(this, args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
        }, delay);
    };
}

created a closure around these value, remembering them even though throttle has finished executing
---------------------------------------------------------------------------------------
|   let isThrottled = false;                                                          |
|   delay = 1000;                                                                     |
|   fn = () => {                                                                      |
|       console.log("Scroll event processed at:", new Date().toLocaleTimeString());   |
|   };                                                                                |
---------------------------------------------------------------------------------------
The lexical scope (backpack)
*/

// The Timestamp example

function throttle(fn, delay) {
    let lastCall = 0; // Tracks the Unix timestamp of the last execution

    return function (...args) {
        const now = Date.now(); // Get the current time in milliseconds

        // Only execute if the time passed is greater than or equal to the delay
        if (now - lastCall >= delay) {
            lastCall = now; // Update the last execution time to right now
            fn.apply(this, args); // Run the original function with its arguments
        }
    };
}

function trackMousePosition(event) {
    console.log(`Mouse Coordinates -> X: ${event.clientX}, Y: ${event.clientY}`);
}

const throttledMouseMove = throttle(trackMousePosition, 500);

window.addEventListener("mousemove", throttledMouseMove);

/* throttledMouseMove = (...args){
    const now = Date.now();

    if (now - lastCall >= delay) {
        lastCall = now;
        fn.apply(this, args);
    }
}

created a closure around these value, remembering them even though throttle has finished executing
---------------------------------
|   let lastCall = 0;           |
|   delay = 500;                |     <----- The lexical scope (backpack)
|   fn = trackMousePosition();  |
---------------------------------
*/

/*
Questions You Should Be Able to Answer

What is throttling?

- Throttling limits how frequently a function can execute during repeated calls.

Why use throttle?

- To reduce how often expensive work happens during high-frequency events while still allowing
  updates during the activity.

What happens to calls during the cooldown?

- They're ignored.

What happens when the timer finishes?

- It does not run fn. It does: canRun = true. Which allows the next call to run fn.

Why is closure important?

- The closure preserves fn, delay, and either the boolean flag or timestamp between calls, allowing
  every call to know whether the function is currently allowed to execute.

Does ...args accumulate arguments?

- No. Each call gets a fresh args containing only that call's arguments.

What's the difference between throttle and debounce?

- Debounce waits until repeated calls stop. Throttle allows execution during repeated calls but
  limits how often it happens.

*/
