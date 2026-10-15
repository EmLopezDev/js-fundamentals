import { useState } from "react";

/*
A controlled component is a form element whose value is managed by React state rather than directly
by the DOM. React state acts as the single source of truth.

- Uses useState to store the input's value.
- Uses value to connect the input to state.
- Uses onChange to update state when the user types.
- Each state-changing keystroke typically triggers a re-render.
- Useful for real-time validation, conditional UI, live filtering, and programmatic resets.
- Re-rendering does not mean React recreates the entire DOM.
*/

const [name, setName] = useState("");

<input
    value={name}
    onChange={(e) => setName(e.target.value)}
/>;
// User types → onChange → setName() → React re-renders → input receives updated value.

function Search() {
    const [query, setQuery] = useState("");

    return (
        <>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <p>Searching for: {query}</p>
            <button disabled={query.trim().length < 3}>Search</button>
        </>
    );
}
/*
React needs the current input value to update the preview and button state.

Remember: Controlled = React manages the value.
*/
