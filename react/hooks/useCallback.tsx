import { useState, useCallback } from "react";
import { ProductGrid } from "../memoization/react.memo";

/*
useCallback

Functions created in a components body get a new reference after every render, which can cause
components who receive this function as a prop to unnecessarily re-render.
*/

const products = [
    { id: 1, name: "" },
    { id: 2, name: "" },
];

function openProduct(id: number, currency?: number) {
    console.log("id", id);
    console.log("currency", currency ?? 0);
}

function ProductPage() {
    const [search, setSearch] = useState("");

    const handleSelect = (id: number) => openProduct(id); // new function every render

    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ProductGrid
                products={products}
                onSelect={handleSelect}
            />
        </>
    );
}
/*
Even though ProductGrid is wrapped in React.memo, because handleSelect is re-created after every
render, it is seen as a new function therefore a new prop being passed to ProductGrid. This causes
ProductGrid to re-render unnecessarily. This is the problem useCallback solves

useCallback tells React to keep the same function reference between renders and only re-create it
if one of its dependencies change.
 */

const handleSelect = useCallback((id: number) => {
    openProduct(id);
}, []);

/*
1. First render: React stores handleSelect and its dependency list.
2. The user types, and ProductPage re-renders.
3. React compares the dependency list to last time using Object.is, the same check as useEffect.
4. Nothing changed, so React returns the stored function. It’s the same reference.
5. memo on ProductGrid sees the same onSelect, so it skips the render.

Note: useCallback stores and returns the function itself not the the result of calling it.
*/
const currency = 0;
const handleSelect2 = useCallback(
    (id: number) => {
        openProduct(id, currency);
    },
    [currency],
);
/*
The function captures values from the render it was created in, if it uses a prop or state that
value belongs in the dependency array.

While currency stays the same, the same function is used. When currency changes, React creates a new
function that captures the new value.


Things to know:

1. useCallback memoizes the function not its result.
2. useCallback on its own is useless, the memoized function must be either passed to to a child that
   is wrapped in React.memo or be a dependency of a hook.
3. Just like all memoization it is a optimization technique, not every function needs to be wrapped
   in useCallback.
4. dispatch and setState do not need to be memoized because they are already stable.
*/
