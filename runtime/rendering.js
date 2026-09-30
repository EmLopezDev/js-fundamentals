/*
Basic Rendering Cycle:

┌─────────────────────────────┐
│     Run JavaScript Task     │
│                             │
│     Call Stack working      │
└──────────────┬──────────────┘
               │
               ▼
        Stack becomes empty
               │
               ▼
┌─────────────────────────────┐
│      Drain Microtasks       │
│                             │
│ Promise .then(), etc.       │
└──────────────┬──────────────┘
               │
               ▼
       Rendering opportunity?
               │
               ▼
┌─────────────────────────────┐
│ requestAnimationFrame       │
│         callbacks           │
└──────────────┬──────────────┘
               │
               ▼
        Style calculation
               │
               ▼
             Layout
               │
               ▼
             Paint
               │
               ▼
           Composite
               │
               ▼
        User sees frame
               │
               ▼
           Next task

Event loop cycle: run a task → drain all microtasks → browser may render (including rAF) → run the
next task. Rendering is optional between tasks, while microtasks are drained before moving on.

*/

/*
Why is understanding rendering important?

A few quick call outs worth knowing:

1. JavaScript running on the main thread can prevent the browser from rendering.
2. Updating the DOM and rendering the update to the screen are not the same event.
3. requestAnimationFrame(), before an upcoming repaint, run this callback. This is requesting work
   associated with an upcoming rendered frame.

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

/*
In-depth definition

(rAF) requestAnimationFrame() - requestAnimationFrame() is a browser API used to schedule JavaScript
that should run in coordination with an upcoming browser repaint, making it especially useful for
animations and other visual updates. Unlike setTimeout(), which only makes a callback eligible to
run after a specified delay and does not force or synchronize with a browser frame,
requestAnimationFrame() tells the browser, “When you are preparing an upcoming frame, run this
callback before you render it.” Once the current JavaScript task finishes and microtasks are
processed, the browser may get a rendering opportunity, at which point rAF callbacks run before the
browser performs rendering work such as style calculation, layout, paint, and compositing. This
allows visual changes made inside the callback to be incorporated into that upcoming frame. For
continuous animations, an rAF callback typically requests another rAF, allowing JavaScript to return
control to the browser between frames rather than blocking the main thread. Because rAF is
coordinated with the browser’s rendering cycle rather than an arbitrary timer, it generally produces
smoother and more efficient visual animations and can be reduced or paused when the page is not
visible.

Simple definition

(rAF) requestAnimationFrame() - schedules visual updates to run before an upcoming browser repaint,
keeping animations synchronized with the browser’s rendering cycle. Unlike setTimeout(), it doesn’t
guess when a frame will occur—the browser tells your callback when it’s preparing to render one.
*/

/*
Browser rendering pipeline

JavaScript
   ↓
Style
   ↓
Layout
   ↓
Paint
   ↓
Composite

Style - the browser determines which CSS rules apply.
Layout - the browser figures out where everything goes and how big is it.
Paint - the browser figures out what pixels need to be drawn.
Composite - the browser combines visual layers into the final image displayed on screen.

A good mental model is:

Style     → What styles apply?
Layout    → Where is everything/how big is it?
Paint     → What pixels should be drawn?
Composite → Combine the layers into the final frame.

Note: for animation it is alway best to use properties like `transform` and `opacity` when appropriate.
`transform` and `opacity` animations can often be handled primarily during compositing, allowing the
browser to avoid expensive layout and paint work on each frame. However, this is an optimization
rather than a guarantee that every earlier rendering stage is always skipped.
*/
