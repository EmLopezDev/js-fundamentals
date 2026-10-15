import { useState } from "react";
/*
Form state management is how React stores, updates, validates, and shares data from form inputs.

Must Knows

1. Multiple fields
- Related form values can be stored together in one state object.

2. Immutable updates
- Create a new state object instead of mutating the existing one.

3. Functional state updates
- Use setForm(prev => ...) when calculating new state from previous state.

4. Derived state
- Calculate values such as isValid from existing state instead of storing unnecessary additional
  state.

5. Lifting state up
- Move form state to a shared parent when multiple components need access to it.

6. State colocation
- Keep state as close as possible to the components that use it to avoid unnecessary re-renders.
*/

// Multiple fields
const [form, setForm] = useState({
    name: "",
    email: "",
});

function updateEmail(email: string) {
    setForm((prev) => ({
        ...prev,
        email,
    }));
}
// ...prev preserves the other fields while email is updated in a new object.

// Full Form example
function RegistrationForm() {
    const [form, setForm] = useState({
        username: "",
        email: "",
    });

    const isValid = form.username.trim().length >= 3 && form.email.includes("@");

    function updateField(field: keyof typeof form, value: string) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <form>
            <input
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
            />

            <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
            />

            <button disabled={!isValid}>Register</button>
        </form>
    );
}
/*
The button's disabled state is derived from the form values. We don't need a separate isValid state
variable.
*/

// Lifting State
function NameEditor(props) {
    return <div></div>;
}

function ProfilePreview(props) {
    return <div></div>;
}

function ProfilePage() {
    const [name, setName] = useState("");

    return (
        <>
            <NameEditor
                name={name}
                onChange={setName}
            />
            <ProfilePreview name={name} />
        </>
    );
}
// Both components need the same name, so the shared parent owns the state.
