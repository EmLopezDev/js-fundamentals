/*
Debouncing is a programming practice used to ensure that a heavy-performance function does not fire
too frequently. It forces a function to wait a certain amount of time before running. If the event
triggers again before the countdown finishes, the previous timer is canceled, and the clock resets

Think of it like an elevator door: the door wants to close, but every time a new person steps in (an
event triggers), the closing timer resets. The door will only close once there is a brief pause with
no new people.

Not to be confused with throttling which is similar but instead of firing off an action once per
fixed interval, instead it waits for a delay in activity or a pause before firing off the action.

- Debounce: "Wait until you're done"
- Throttling: "You can keep going, but I'll only respond every so often."

Common Use Cases

- Search Auto-complete: Waiting for a user to pause their typing before making an API request,
  rather than hitting the database on every single keystroke.
- Window Resizing: Delaying expensive layout calculations until the user finishes dragging their
  browser window.
- Submit Buttons: Preventing accidental double-clicks from submitting a form twice.
- Expensive Calculations: running an expensive calculation after every event that triggers it, can
  affect performance. Delaying it so it only runs once or at least less times improves performance.
*/

/*
To create a debounce function, you leverage a JavaScript closure to keep track of a hidden timeout
ID (timeoutId).
*/

// fn: function we want to eventually run
// delay: how long we should wait before running fn
function debounce(fn, delay) {
    // timerId: id of currently running timer.
    let timerId;
    // returns a function that created a closure around fn, delay, and timerId
    return function (...args) {
        // whenever this return function is ran, it clears the previous timerId to essential cancel
        // the previously awaiting action
        clearTimeout(timerId);
        // it created a new count down timerId for the new action that will wait to execute.
        timerId = setTimeout(() => {
            // each time this inner function is called a new args array is created and setTimeout
            // creates it's own closure around ...args
            fn(...args);
        }, delay);
    };
}

async function searchUsers(query) {
    try {
        const response = await fetch(`some_api_call_here/${query}`);
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

const debouncedSearch = debounce(searchUsers, 500);

debouncedSearch(`some search value`);
/*
debounceSearch is really the following:

debouncedSearch = (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
        searchUsers(...args);
    }, 500);
}

created a closure around these value, remembering them even though debounce has finished executing
-----------------------------------------
|   let timerId;                        |
|   delay = 500;                        |  <------ The lexical scope (backpack)
|   fn = searchUsers();                 |
-----------------------------------------

As long as the user is firing this debouncedSearch it keeps looping. First clearing the previous
timerId to cancel the action awaiting to be executed which is a call to searchUsers() with the
previous args, then creating a new timer for the new action which is a new call to searchUsers()
passing in the new args awaiting to be executed. The fn passed in this case searchUsers won't fire
off until the timer fully counts down to the delay amount.
*/

/*
After studying debounce, make sure you can answer these:

What is debouncing?

- Delaying a function until a specified amount of time has passed since its most recent call.

Why use debounce?

- To prevent a function from running unnecessarily during rapid repeated events.

What happens when another call occurs before the delay ends?

- The previous timer is cancelled and a new timer starts.

What JavaScript features make debounce work?

Primarily:

- Closures
- setTimeout()
- clearTimeout()
- Higher-order functions
- Rest/spread syntax

Why is a closure important?

- A closure allows the returned debounced function to keep access to timer, fn, and delay even after
  debounce() has finished running. Most importantly, it lets every call access and update the same
  timer variable, so the previous timer can be cancelled before a new one is created.

Does a 500ms debounce mean the function executes exactly 500ms later?

- No. It means it won't execute before the delay has elapsed; actual execution also depends on the
  event loop and call stack.

What's the basic difference between debounce and throttle?

Debounce waits until calls stop. Throttle limits how frequently a function can run while calls
continue.
*/

/*
Basic implementation to memorize but also understand what is happening for interview prep
*/

async function searchUsers(query) {
    const response = await fetch(`/api/users?search=${query}`);

    const users = await response.json();

    console.log(users);
}

const input = document.querySelector("#search");

input.addEventListener("input", (event) => {
    searchUsers(event.target.value);
});

/*
j          → searchUsers("j")
ja         → searchUsers("ja")
jav        → searchUsers("jav")
java       → searchUsers("java")
javas      → searchUsers("javas")
javasc     → searchUsers("javasc")
...
javascript → searchUsers("javascript")

searchUsers() is ran with every keystroke making an API call every time which can cause performance
issues
*/

function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const debouncedSearchUser = debounce(searchUsers, 500);

input.addEventListener("input", (event) => {
    debouncedSearchUser(event.target.value);
});

/*
"j"    → wait...
"ja"   → reset
"jav"  → reset
"java" → reset
          ↓
       user stops
          ↓
        500ms
          ↓
     API request
          ↓
 searchUsers("java")

 The call is only made once after the user stops inputting values
*/
