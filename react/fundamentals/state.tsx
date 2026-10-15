import { useState } from "react";

/*
State Is a Snapshot

Event handlers capture the state from the render in which they were created
*/

export function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        console.log(count);
    };

    return <button onClick={handleClick}>Count: {count}</button>;
}
/*
When React renders this component with count = 0, the handleClick function created during the render
sees count as 0.

Calling setCount(count + 1), schedules a state update. It doesn't change the count variable inside
the currently running handler.

Render A, count = 0
Creates a handler that sees count as 0

Click event, setCount(1) queues the next state value
console.log(count) still prints 0

Render B, count = 1
Creates a new handler that sees count as 1

This is closely related to JavaScript closures.
*/

function Counter2({ label }: { label: string }) {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount((c) => c + 1)}>
            {label}: {count}
        </button>
    );
}

function App2() {
    const [showFirst, setShowFirst] = useState(true);

    return (
        <div>
            {showFirst ? <Counter2 label="First" /> : <Counter2 label="Second" />}

            <button onClick={() => setShowFirst((v) => !v)}>Switch</button>
        </div>
    );
}

/*
One thing to keep in mind as far as state goes:

React stores state outside your component function, in its internal data structures associated with
the component's position and identity in the React tree.

A new component function execution creates new JavaScript bindings, but not necessarily new React
state. React preserves state across renders as long as the component maintains its identity.

As seen in the example above because both Counter2s are in the same position and because they don't
have a key to distinguish them by, React identifies them as the same even if their props are
different. When switching React will re-render to show the appropriate label but because to React
their identity is the same, the state associated with each will be the same one.

- Re-rendering: Executes the component function again, creating new local bindings.
- State preservation: React retains the state associated with the component's identity.
- Remounting: React creates a new component instance with fresh state when its identity changes.
*/
