import { useRef } from "react";
/*
An uncontrolled component is a form element whose current value is managed by the browser's DOM
rather than React state. The DOM acts as the source of truth.

- Uses defaultValue for an initial value instead of value.
- Does not require useState to track every keystroke.
- Typing does not trigger React re-renders by itself.
- Values can be accessed through useRef or FormData.
- Useful for simple forms, submission-only data, and DOM-based integrations.
- File inputs are inherently uncontrolled.
*/
function Form() {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                ref={inputRef}
                defaultValue=""
            />

            <button onClick={() => console.log(inputRef.current?.value)}>Read Value</button>
        </>
    );
}
// User types → Browser updates DOM value → React reads value when needed.

function ContactForm() {
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        console.log(email);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                defaultValue=""
            />
            <button type="submit">Send</button>
        </form>
    );
}
/*
React doesn't need to track the email while the user types. It retrieves the value at submission.

Remember: Uncontrolled = Browser manages the value.
*/
