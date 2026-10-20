import { createContext, useContext } from "react";
/*
createContext

creates a Context object that React uses to share particular values with child components of a
Provider.

createContext() takes in a default value which is used when a component reads the Context but is not
a child of the matching Provider. Giving createContext() a default value doesn't create a state
variable and it doesn't make the value update automatically. It just creates the Context object that
will be used to share a value.
*/

const CartContext = createContext(0);

function CartButton() {
    const cartCount = useContext(CartContext);

    return <button>Items: {cartCount}</button>;
}

/*
In the above example useContext() is asking React for the current value of CartContext. Since there
is no matching Provider cartCount will be 0 the default value. However if there was a Provider and
the CartContext value was 5 then cartCount would be 5. The default value is essentially a fallback,
not a live state.


In TypeScript the default value will influence the type assigned to Context. In the above example
TypeScript will infer that Context will be of type number. For more a more complex value, we can
define it's shape as so:
*/

type CartContextValue = {
    cartCount: number;
    addItem: () => void;
};

const CartContext2 = createContext<CartContextValue | null>(null);

/*
choosing null as the default value is a better option because we can check for null and show a clear
error instead of silently using fake data.
*/
