import { useEffect, useState } from "react";
/*
useEffect allows a React component to synchronize with systems/actions outside of React.

Examples include:
- Subscribing to browser events such as resize or keydown.
- Connecting to a WebSocket.
- Starting and cleaning up timers.
- Synchronizing with third-party libraries.
- Fetching data when needed, while handling stale requests.

The important distinction is that rendering calculates what the UI should look like, while effects
synchronize with external systems after React commits the UI.

When not to use useEffect?

Rule: If you can calculate something during rendering from existing props or state, you usually
don't need an effect.
*/

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    return <p>{time.toLocaleTimeString()}</p>;
}
// The component renders the current time. The effect manages the external timer.

/*
Effect Lifecycle

An effect has two important operations:
- Setup: Establishes synchronization.
- Cleanup: Undoes the previous synchronization.
*/

/*
Dependency Array

useEffect(fn) - runs after every committed render
useEffect(fn, []) - runs on mount; cleanup on unmount
useEffect(fn, [userId]) - runs on mount and whenever userId changes
*/

let userId;

useEffect(() => {
    console.log("Subscribed to user:", userId);

    return () => {
        console.log("Unsubscribed from user:", userId);
    };
}, [userId]);
/*
If userid changes from 1 to 2 the sequence is:

Subscribed to user: 1; Unsubscribed from user: 1; Subscribed to user: 2;

Each effect setup and cleanup also uses closures, so the cleanup for user 1 still sees userId = 1

An important rule: Every reactive value used by an effect should be represented in its dependencies.
*/
