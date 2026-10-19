import { useState, useReducer } from "react";
/*
useReducer

useReducer gives us a way to organize state updates in one place. This is particularly beneficial
when there are a lot of different functions updating the same state.

Imagine a shopping cart that needs to support several actions.
- adding an item
- removing an item
- increasing an item's quantity
- reducing an item's quantity
- clearing the cart

This of course could be handled with state as so:
*/
interface CartItem {
    id: number;
}

const [cart, setCart] = useState<CartItem[]>([]);

function addItem(item: CartItem) {
    setCart((prev) => [...prev, item]);
}

function removeItem(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
}

function clearCart() {
    setCart([]);
}

/*
This works, but imagine more actions needed to be added to the cart. It can easily get out of hand.
In comes useReducer to help facilitate all these actions.

The three important pieces of useReducer are :
1. State = the current data
2. Action = a description of what happened
3. Reducer = a function that calculates the next state.

Reducer Pattern:

function reducer(state, action) {
    // Determine the next state
    return newState;
}

Here is a useReducer example:
*/

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function counterReducer(state: number, action: Action): number {
    switch (action.type) {
        case "increment":
            return state + 1;

        case "decrement":
            return state - 1;

        case "reset":
            return 0;

        default:
            return state;
    }
}

export default function Counter() {
    /*
    count = current state
    dispatch = sends an action
    counterReducer = calculates the next state
    */
    const [count, dispatch] = useReducer(counterReducer, 0);

    return (
        <div>
            <p>Count: {count}</p>

            <button onClick={() => dispatch({ type: "increment" })}>Increment</button>

            <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>

            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        </div>
    );
}
/*
When ever you dispatch an action you are telling useReducer to use the reducer function provided,
which is counterReducer in this example, to calculate the next state which is initialize to 0 here.

Dispatch() is used to describe what action to take on the state. React queues the update an calls
the reducer with the appropriate state and action.

- dispatch({ type: "increment" })
- counterReducer(0, {type: "increment"}) is called
- case "increment": return state + 1;
- the reducer returns the next state which is 1
- React renders the updated Counter function


reducers should be pure function meaning:

- Given the same state and action, it returns the same result.
- It doesn't mutate the existing state.
- It doesn't perform side effects such as network requests or changing the DOM.
*/

/*
actions with payloads

As previously noted actions describe what should happen. Actions tell the reducer what to do to get
to the next state. In the above example { type: "increment" } told the reducer to add 1 to the
state. But what if we wanted to increment by a specific amount. { type: "incrementBy", payload: 5 }
we can do so by adding a payload to the action. Here type is telling the reducer what to do and the
payload is giving it the data it needs to perform that action. When the reducer receives that action
and identifies the type, it can use that payload as part of its action:
- case "incrementBy": return state + action.payload;
*/

/*
Example managing complex object state
*/
type ProfileState = {
    name: string;
    email: string;
    isEditing: boolean;
};

// Discriminating union make actions type safe and allow for action type narrowing
type ProfileAction =
    | { type: "updateName"; payload: string }
    | { type: "updateEmail"; payload: string }
    | { type: "toggleEditing" };

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
    switch (action.type) {
        case "updateName":
            return {
                ...state,
                name: action.payload,
            };

        case "updateEmail":
            return {
                ...state,
                email: action.payload,
            };

        case "toggleEditing":
            return {
                ...state,
                isEditing: !state.isEditing,
            };

        default:
            return state;
    }
}

const initialState: ProfileState = {
    name: "Alex",
    email: "alex@example.com",
    isEditing: false,
};

function ProfileEditor() {
    const [profile, dispatch] = useReducer(profileReducer, initialState);

    return (
        <div>
            <input
                value={profile.name}
                onChange={(e) =>
                    dispatch({
                        type: "updateName",
                        payload: e.target.value,
                    })
                }
                disabled={!profile.isEditing}
            />

            <input
                value={profile.email}
                onChange={(e) =>
                    dispatch({
                        type: "updateEmail",
                        payload: e.target.value,
                    })
                }
                disabled={!profile.isEditing}
            />

            <button onClick={() => dispatch({ type: "toggleEditing" })}>
                {profile.isEditing ? "Done" : "Edit"}
            </button>
        </div>
    );
}
/*
This demonstrates what is possible with useReducer. Rather than having 3 separate states and 3
separate state handler functions to manage everything here we have one state `profile` and one
handler `profileReducer` that manages all these changes. For an example this small you could
absolutely use useState to manage the state changes, but imagine for a form that has more complexity.
*/
type FormState = {
    values: {
        name: string;
        email: string;
    };
    error: string | null;
    isSubmitting: boolean;
    isSuccess: boolean;
};
/*
A single "submitStart" action might need to:
- Set isSubmitting to true.
- Clear previous errors.
- Reset isSuccess to false.

Instead of updating all these fields separately, one reducer case can describe the complete action:

- case "submitStarted": return { ...state, isSubmitting: true, isSuccess: false, errors: null };

This is one of the strongest reasons to use a reducer: related state changes happen together,
according to clearly defined rules. You describe the event that happened and let the reducer
determine all the necessary changes
*/

type FormAction =
    | { type: "submitStarted" }
    | { type: "submitSucceeded" }
    | { type: "submitFailed"; payload: string };

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "submitStarted":
            return {
                ...state,
                isSubmitting: true,
                isSuccess: false,
                error: null,
            };

        case "submitSucceeded":
            return {
                ...state,
                isSubmitting: false,
                isSuccess: true,
            };

        case "submitFailed":
            return {
                ...state,
                isSubmitting: false,
                isSuccess: false,
                error: action.payload,
            };
    }
}

/*
As mentioned reducers should be pure functions that perform no side effects.

Good: case "increment": return { ...state, count: state.count + 1 };

Bad: case "save": fetch("/api/save", { method: "POST" }); return state;

Api request or side effects in general should live in an event handler or an appropriate effect
*/

const INITIAL_FORM_STATE: FormState = {
    values: {
        name: "",
        email: "",
    },
    error: null,
    isSubmitting: false,
    isSuccess: false,
};

async function saveProfile() {}

async function handleSubmit() {
    const [profile, dispatch] = useReducer(formReducer, INITIAL_FORM_STATE);
    dispatch({ type: "submitStarted" });

    try {
        await saveProfile();

        dispatch({ type: "submitSucceeded" });
    } catch (error) {
        dispatch({
            type: "submitFailed",
            payload: "Unable to save profile",
        });
    }
}
/*
The event handler handles the asynchronous operation. The reducer handles the resulting state
transitions.

"What's the difference between useState and useReducer?"

A strong answer would be:

Both hooks manage component state. useState is usually simpler for straightforward updates, while
useReducer is useful when state has multiple related transitions or complex update logic. With
useReducer, components dispatch actions and a pure reducer calculates the next state. Both follow
React's normal rendering and state snapshot behavior.
*/
