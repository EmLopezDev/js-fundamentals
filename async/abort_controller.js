/*
AbortController gives you a way to tell an abort-aware operation such as fetch() that you no longer
want it to continue.

User types: "j"
→ request starts for "j"

User types: "ja"
→ another request starts for "ja"

User types: "jav"
→ another request starts for "jav"

Without cancellation, all three requests may still be in progress. Worse, they could finish out of
order and leave you dealing with stale results.
*/

// Basic syntax
const controller = new AbortController();

const response = fetch("/api/users", {
    /* AbortController owns the signal and passes it to fetch. This creates the connection between
    the controller and the abortable operation */
    signal: controller.signal,
});

controller.abort();

/*
Mental Model:

controller.abort()
        ↓
signal becomes aborted
        ↓
fetch observes the signal
        ↓
fetch's Promise rejects
*/

/*
What happens to the Promise?

request in the example above is a Promise. Aborting doesn't make the Promise disappear, instead
the fetch() Promise rejects

Conceptually:

fetch()
  ↓
request → PENDING

controller.abort()
  ↓
fetch is aborted
  ↓
request → REJECTED

So you can handle it like any other rejection
*/

fetch("/api/data", {
    signal: controller.signal,
})
    .then((response) => response.json())
    .catch((error) => {
        console.log(error);
    });

/*
In browsers, an intentional abort commonly produces an error whose name is "AbortError". Which is
why often you will see something like the following:
*/

try {
    const response = await fetch("/api/data", {
        signal: controller.signal,
    });

    const data = await response.json();
} catch (error) {
    // We intentionally cancelled
    if (error.name === "AbortError") {
        console.log("Request was cancelled");
    }
    // Something may actually have gone wrong
    else {
        console.error("Request failed:", error);
    }
}

/*
ONE IMPORTANT CALL OUT

Aborting fetch() on the client does NOT guarantee that work already started
on the server has stopped.

For example:
*/

const controller2 = new AbortController();

fetch("/api/delete-account", {
    method: "POST",
    signal: controller2.signal,
});

controller2.abort();

/*
In the example above you cannot conclude that the account deletion definitely didn't happen.

AbortController primarily tells the client-side operation to stop waiting/processing. Whether
server-side work stops depends on the server/framework and whether it detects and responds to the
disconnected client.
*/

/*
One controller can also cancel multiple operations
*/

const controller3 = new AbortController();
// The same signal is being shared
fetch("/api/users", {
    signal: controller3.signal,
});

fetch("/api/posts", {
    signal: controller3.signal,
});

fetch("/api/comments", {
    signal: controller3.signal,
});

// Can abort all the operations
controller3.abort();

/*
Remember this

AbortController provides a way to cancel abort-aware asynchronous operations such as fetch(). You
pass controller.signal to the operation and call controller.abort() to signal cancellation. An
aborted fetch() rejects its Promise, commonly with an AbortError. Aborting the client request does
not guarantee that work already received by the server has stopped.

controller
→ the object you use to initiate the cancellation

controller.signal
→ connects/communicates the controller's abort state
  to the abort-aware operation

controller.abort()
→ triggers the abort signal

request
→ fetch's Promise rejects because the operation was aborted
*/
