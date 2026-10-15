import { useState } from "react";

/*
React's Rendering Process

React rendering and updating the actual DOM are two different operations.
*/

// Updating the DOM
export function Counter() {
    const [count, setCount] = useState(0);

    console.log("Counter rendered");

    return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

/*
When you click the button, React doesn't immediately rewrite the entire DOM. It goes through a
process.

1. Trigger: A state update is scheduled, or React needs to render the component initially.
2. Render: React calls your component to calculate the next UI description and determines what needs
   to change.
3. Commit: React applies the necessary changes to the DOM
*/

/*
A render doesn't necessarily mean a DOM update. React may call your component again and realize
nothing has changed.

Rendering should be pure, meaning React expects components to behave like pure functions. Given the
same props, state, and context, a component should calculate the same UI without modifying external
values.
*/

let renderCount = 0;

export function Counter2() {
    renderCount++; // Side effect during rendering

    return <p>Rendered {renderCount} times</p>;
}
/*
This is a problem because in can cause React to invoke rendering more than once, restart rendering,
or even cancelling work before committing. Rendering should calculate UI and not perform side
effects.

NOTE: This is why things like Api request shouldn't be done directly in the component body. If an
API request happens during rendering, it could execute even when that render never makes it to the
screen. An effect is appropriate for synchronizing with an external system, such as fetching data
for the currently displayed user, which is why using useEffect for this type of action is best.
*/

// In development strict mode intentionally performs extra renders to helps detect impure components

/*
What can trigger a React re-render?

1. Local state updates - Calling a useState setter or dispatching a useReducer action can schedule a
   re-render.
2. Parent re-renders - Child components normally re-render when their parent re-renders, even if
   their props haven't changed.
3. Context changes - Components consuming a context re-render when the context value changes.
4. External store updates - Hooks such as useSyncExternalStore can trigger re-renders when
   subscribed data changes.
5. Force updates - Class components have forceUpdate(), which requests a re-render.
6. Suspense or transitions - React may retry rendering when suspended data becomes available or a
   transition progresses.

The most useful mental model is:

React renders components when it needs to process an update affecting them or their place in the
tree.
*/
