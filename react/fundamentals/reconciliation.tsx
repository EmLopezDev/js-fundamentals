import { useState } from "react";
/*
Reconciliation

1. Reconciliation is React's process of determining how the newly rendered UI differs from the
previous UI.
*/

export function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Counter</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

/*
When count changes from 0 to 1, React doesn't need to recreate the entire DOM structure. Only the
count text needs to change in the DOM. React compares the previous UI and the next UI, then commits
the necessary changes.

2. Reconciliation also determines component identity.

React associates state with a component's position in the UI tree, together with its component type
and if applicable its key.
*/

// Child component
function Counter() {
    const [count, setCount] = useState(0);

    return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// Parent Component
function App2() {
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={isDark ? "dark" : "light"}>
            <Counter />
            <button onClick={() => setIsDark((d) => !d)}>Toggle Theme</button>
        </div>
    );
}

/*
When the theme changes:
1. App re-renders.
2. React encounters <Counter /> at the same position.
3. Its component type is still Counter.
4. React preserves the existing Counter state.

Changing a parent's props or state does not automatically reset child component state.

3. Changing component type resets state
*/
function Message() {
    return <div>message</div>;
}

function App3() {
    const [showCounter, setShowCounter] = useState(true);

    return <div>{showCounter ? <Counter /> : <Message />}</div>;
}
/*
When showCounter changes from true to false, React replaces Counter with Message. Because the
component type changes, React unmounts Counter and discards its local state. If Counter later
returns, it mounts with fresh state. This is a good thing to keep in mind for any component with
local state.


4. Keys are part of component identity
*/
type User = {
    user: {
        id: number;
        name: string;
    };
};

function UserCard({ user }: User) {
    return <div>{user.name}</div>;
}

const users = [
    { id: 1, name: "Sarah" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Jordan" },
];

{
    users.map((user, idx) => (
        <UserCard
            // key={idx} not a good approach especially with dynamic arrays.
            key={user.id}
            user={user}
        />
    ));
}

/*
Keys help React identify which component corresponds to which item across renders. It is important
to use stable keys because stable keys allows React to match each item with its previous identity.
This is the reason why using indexes as a key is problematic. If the users array in the above
example get re-ordered, React may then associate an existing component's state with the wrong user
because its index changed.

5. Keys can intentionally reset state
*/
function ProfileEditor({ userId }: { userId: number }) {
    const [notes, setNotes] = useState("");

    return (
        <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
        />
    );
}
const selectedUserId = 2;

<ProfileEditor
    key={selectedUserId}
    userId={selectedUserId}
/>;

/*
Changing selectedUserId changes the key, telling React to treat the editor as a different component
instance which resets it's local state.
*/
