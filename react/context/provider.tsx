import { createContext, useContext, useState } from "react";
/*
Provider

A Provider is the part of your component tree that supplies a value to its children components.
*/

const CartContext = createContext(0);

function App() {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartContext.Provider value={cartCount}>
            <CartButton />
            <button onClick={() => setCartCount((count) => count + 1)}>Add item</button>
        </CartContext.Provider>
    );
}

function CartButton() {
    const cartCount = useContext(CartContext);

    return <button>Items: {cartCount}</button>;
}

/*
In the above example since App wraps CartButton with CartContext.Provider and supplies a value of 5,
the button will display Items: 5. Notice CartButton doesn't receive any props, instead it is reading
the value directly from the Context.

Any descendant components that read this Context can access the provided value.

Note: a component reads from the nearest matching Provider above it. A Provider doesn't supply its
value to components outside its subtree.

In real application Context usually gets its values from state. The state setter requests a state
update, React renders the component with the updated state, the Provider receives the updated value,
and then components consuming that Context are notified of the changed value and can re-render to
show the updated value. Remember Context doesn't replace useState, useState manages the changing
value and Context just makes that value available to its children.
*/
const cartCount = 0;

// React 19 you can render the Context object itself as the Provider
<CartContext value={cartCount}>
    <CartButton />
</CartContext>;

// Older form that is still widely used and functions in React 19.
<CartContext.Provider value={cartCount}>
    <CartButton />
</CartContext.Provider>;

// You will encounter both so get familiar with them.
