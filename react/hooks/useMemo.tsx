import { useState, useMemo } from "react";
/*
useMemo

Unlike useCallback that stores and returns a function, useMemo stores and returns the result of a
function or calculation. This solves for:

1. A calculation that is expensive and re-running it on every render is wasteful.
2. An object or array whose reference needs to stay stable, so React.memo, hooks, or Context
   Providers don't see it as a "new" value every render.
*/
interface Feedback {
    id: string;
    message: string;
}

function FeedbackList({ feedback }: { feedback: Feedback[] }) {
    const [search, setSearch] = useState("");
    const [dark, setDark] = useState(false);

    const visibleItems = useMemo(
        () => feedback.filter((f) => f.message.includes(search)),
        [feedback, search],
    );

    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setDark(!dark)}>Toggle theme</button>
            <FeedbackTable items={visibleItems} />
        </>
    );
}

function FeedbackTable({ items }: { items: Feedback[] }) {
    return (
        <ul>
            {items.map((item) => {
                return <li>{item.message}</li>;
            })}
        </ul>
    );
}
/*
1. First render: React runs the filter and stores the result along with [feedback, search].
2. The user clicks the theme toggle, so FeedbackList re-renders.
3. React compares the dependencies with Object.is. feedback and search haven’t changed.
4. React returns the stored array without running the filter. It’s the same reference, so a memoized
   FeedbackTable skips its render too.
5. The user types in the search box. search changed, so React re-runs the filter and stores the new
   result.
*/

// Memoizing an Object for stability
const state = "";
const dispatch = {};

const value = useMemo(() => ({ state, dispatch }), [state]);

/*
The object is only rebuilt when state changes. Same idea, different goal: here it’s about keeping
the reference stable, not saving a calculation. This is commonly seen to memoize a Context value to
avoid it being seen as a "new" object with each render, until a value in the dependency list
changes.

A few import callouts:

1. The function must be pure. It runs during render, so it shouldn’t change state, fetch data, or
   touch the DOM. Side effects belong in useEffect.
2. Don’t mutate inputs inside it. feedback.sort(...) sorts the original array in place. Copy first:
   [...feedback].sort(...).
3. It’s a performance hint, not a guarantee. React can discard a cached value in some cases, such as
   to free memory. Your code must produce the correct result even if it recomputes, which is the
   same rule as React.memo.
4. It has a cost. React stores the value and compares dependencies on every render. For a cheap
   calculation, such as filtering 20 items, memoizing costs more than it saves.
5. It isn’t for correctness. If your app only works because of useMemo, there’s a bug elsewhere,
   often in a dependency array.

If you are unsure if a calculation is "expensive", don't guess time it with
console.time/console.timeEnd or use the React DevTools Profiler. A good rule of thumb is any
calculation that takes 1ms or less doesn't need to be memoized, use your discretion.
*/

function FeedbackList2({ feedback }: { feedback: Feedback[] }) {
    const [search, setSearch] = useState("");

    console.time("filter feedback");
    const visibleItems = feedback.filter((f) => f.message.includes(search));
    console.timeEnd("filter feedback");

    return <FeedbackTable items={visibleItems} />;
}
