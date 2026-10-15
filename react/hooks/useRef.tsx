import { useRef, useState } from "react";
/*
useRef

useRef is a React hook that creates a persistent, mutable object whose .current property can hold a
value between renders.
*/
const counterRef = useRef(0);

/*
Conceptually, React gives you an object like this:

{ current: 0 }

Two important characteristics:
- The ref object persists across re-renders while the component retains its identity.
- Changing .current does not trigger a re-render.
*/

function Counter() {
    const countRef = useRef(0);

    console.log("Rendered");

    function handleClick() {
        countRef.current += 1;
        console.log(countRef.current);
    }

    return <button onClick={handleClick}>Count: {countRef.current}</button>;
}

/*
When you click:

- countRef.current increases.
- The console displays the new value.
- React does not re-render because of that ref change.
- The button continues displaying the old value.
*/

const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
/*
Imagine implementing a search input with debounce, where you need to remember the timerId between
keystrokes so you can cancel the previous timerId but you don't need to display the timerId. The
timer reference persists between renders and changing it doesn't cause unnecessary UI updates.

One important nuance: avoid reading or writing ref.current during rendering for ordinary application
logic. Use refs in event handlers, effects, and ref assignments. React expects rendering to remain
pure.
*/

/*
useRef main purposes

1. DOM ref

A DOM ref gives you access to an actual HTML element that React has rendered.

Common use cases include focusing inputs, scrolling elements into view, measuring element
dimensions, controlling media playback, and integrating browser APIs or third-party libraries.
*/

const inputRef = useRef<HTMLInputElement>(null);

/*
- inputRef is the persistent ref object.
- HTMLInputElement tells TypeScript what kind of element it will reference.
- null is the initial value because the input hasn't been attached yet.
- inputRef.current will reference the actual input element once React attaches it.
*/

function SearchBox() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFocus() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input
                ref={inputRef}
                placeholder="Search..."
            />
            <button onClick={handleFocus}>Focus Search</button>
        </>
    );
}
/*
1. React renders SearchBox. During rendering, inputRef.current is initially null.
2. React commits the input element to the DOM and assigns it to inputRef.current.
3. The user clicks Focus Search, triggering handleFocus.
4. inputRef.current?.focus() calls the browser's native focus() method on the input element.
5. If the SearchBox re-renders, inputRef.current is preserved
6. React unmounts input, inputRef.current will become null.

One important distinction: refs persist across renders, but a DOM ref's .current can change when the
referenced element is replaced or removed.
*/

/* 2. Persistent Value between renders */

function Counter2() {
    let count = 0;

    function handleClick() {
        count += 1;
        console.log(count);
    }

    return <button onClick={handleClick}>Increment</button>;
}

/*
Clicking the button will increment `count` because the current event handler closes over it. The
issue is when ever React re-renders Counter2, it invokes the component function again creating a new
`count` variable initialized to 0. The new event handler closes over the new `count` variable and
doesn't preserve values across renders.
*/

function Counter3() {
    const [renders, setRenders] = useState(0);
    const countRef = useRef(0);

    function incrementRef() {
        countRef.current += 1;
        console.log("Ref count:", countRef.current);
    }

    return (
        <>
            <button onClick={incrementRef}>Increment Ref</button>

            <button onClick={() => setRenders((prev) => prev + 1)}>Trigger Re-render</button>

            <p>Render count: {renders}</p>
        </>
    );
}

/*
useRef solves this by persisting a value across renders.

1. Click Increment Ref three times. countRef.current becomes 3.
2. Click Trigger Re-render. React executes Counter3 again.
3. useRef(0) returns the same ref object from the previous render.
4. Click Increment Ref again. The console displays 4, not 1.


Closure vs useRef

A closure preserves access to a particular variable binding
*/

function createCounter() {
    let count = 0;

    return () => ++count;
}

const counter = createCounter();

counter(); // 1
counter(); // 2
// As long as you keep using the same returned function, it accesses the same count binding.

// useRef preserves an object across React renders.

const countRef = useRef(0);

/*
React gives each render access to the same ref object, even though each render creates new local
variable bindings.

Real-world use cases:

- Debounce timer: Keeps the timeout ID between renders
- Previous value tracking: Remembers a value without triggering a render
- Interval ID: Keeps the interval handle available for cleanup
- DOM element reference: Stores the element React attaches
- Third-party library instance: Preserves an object such as a chart instance

Interview ready answer:

useRef stores a mutable value that persists across renders without triggering re-renders. Closures
retain access to variables from a particular function execution, while React preserves the ref
object across executions of the component function.
*/
