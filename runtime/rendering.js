/*
Once the microtask queue is completely empty, the browser checks if it is time to update the screen.
If so, it enters the rendering step and  runs requestAnimationFrame callbacks, recalculates styles,
performs layout (reflow), and paints the pixels.

The reason it is important to know where this happens in the runtime process is to be mindful of
your queues, if the main script task or microtasks take to long to finish your UI will not update or
load all the way properly causing for a poor user experience.


- Step 1: Run the initial script (Macrotask #1).
- Step 2: The script finishes. The call stack is empty. Flush all promises (Microtask Queue).
- Step 3: The microtasks finish. Check if the screen needs an update (Rendering Phase).
- Step 4: Move on to your setTimeout or click listener callbacks (Macrotask #2).
*/

/*s
Examples Of things to looks out for:

Example 1: Microtasks Block Rendering (The Frozen UI)

Because the browser must empty the entire microtask queue before it can render, recursively
scheduling microtasks will completely starve the rendering phase.
*/

function blockRendering() {
    console.log("Starting infinite microtask loop...");

    // This text update will be hidden from the user because
    // the browser never gets a chance to paint it.
    document.body.innerText = "Processing data...";

    function queueMicrotaskLoop() {
        Promise.resolve().then(() => {
            // Recursively adds another microtask to the queue
            queueMicrotaskLoop();
        });
    }

    queueMicrotaskLoop();
}

blockRendering();

/*
What happens: The text changes in the DOM conceptually, but the main thread is locked in the
microtask phase forever. The page freezes, animations stop, and you will never see "Processing
data..." appear on your monitor.
*/

/*
Example 2: Macrotasks vs. Rendering OrderThis example shows how multiple DOM updates inside the same
synchronous block or split by microtasks are batched together into a single rendering phase.
*/

function triggerUpdates() {
    // 1. Synchronous Code (Call Stack)
    console.log("1. Script start");
    document.body.style.backgroundColor = "red";

    // 2. Macrotask (Queued for next event loop iteration)
    setTimeout(() => {
        console.log("4. setTimeout (Macrotask) runs");
        document.body.style.backgroundColor = "green";
    }, 0);

    // 3. Microtask (Runs immediately after call stack empties)
    Promise.resolve().then(() => {
        console.log("3. Promise (Microtask) runs");
        document.body.style.backgroundColor = "blue";
    });

    // 4. Animation Frame (Runs during the next Rendering Phase)
    requestAnimationFrame(() => {
        console.log("5. requestAnimationFrame runs right before Paint");
    });

    document.body.style.backgroundColor = "yellow";
    console.log("2. Script end");
}

triggerUpdates();

/*
- Call Stack: Logs 1. Script start. Sets background to red. Schedules the setTimeout macrotask, the
  Promise microtask, and the requestAnimationFrame callback. Sets background to yellow. Logs 2.
  Script end.
- Microtask Queue Flushed: The stack is empty. The event loop checks the microtask queue and runs
  the Promise callback. Logs 3. Promise (Microtask) runs. Sets background to blue.
- Rendering Phase Intermission: The microtask queue is now empty. The browser prepares a frame. It
  executes the requestAnimationFrame callback first, logging 5. requestAnimationFrame runs right
  before Paint.
- The Visual Paint: The browser finally executes Style, Layout, and Paint. The user only sees the
  background turn blue (or whatever final style was applied up to the requestAnimationFrame step).
  The intermediate red and yellow styles are never drawn on screen.
- Next Macrotask: The event loop moves to the next iteration and picks up the setTimeout callback.
  Logs 4. setTimeout (Macrotask) runs. Sets background to green. (This will trigger a completely
  separate render phase in a future frame).
*/
