import { useState, createContext, useContext, useMemo, useCallback, type ReactNode } from "react";
/*
useMemo to memoize Context value

When a Provider re-renders, React compares the new value with the previous one using Object.is. If
the value is the same consumers are not forces to re-render because of Context. However if the
value has changed then every component calling useContext for that Context re-renders.
*/

type CartContextValue = {
    cartCount: number;
    addItem: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState(0);

    function addItem() {
        setCartCount((prev) => prev + 1);
    }

    const contextValue = {
        cartCount,
        addItem,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}
/*
In the example above every time the CartProvider renders a new contextValue object is created, which
means a new reference therefore all consumers of the CartProvider Context will re-render. If
cartCount actually changes that is fine, but what about if the Provider re-renders for another
reason like if it's parent re-renders and nothing changes in the Provider. Because a new
contextValue is created this will force all the Context consumers to also re-render unnecessarily.

The fix is using useMemo.
*/
const contextValue = useMemo(
    () => ({
        /* cartCount, addItem */
    }),
    [
        /* cartCount, addItem */
    ],
);

/*
1. First render: useMemo builds { cartCount, addItem } and caches it.
2. Provider re-renders, cartCount unchanged: useMemo returns the same cached object. The reference
   is the same, so React doesn’t notify consumers.
3. cartCount changes: useMemo builds a new object, and consumers update, as they should.

For the above example you would wrap the addItem function in a useCallback hook so it won't be seen
as a new function during each render
*/

useCallback(function addItem() {}, []);
const addItem = useCallback(() => {}, []);

/*
Some Rules:

- Memoization is an optimization not a requirement, app can work fine without it. Use it if you
  notice a real performance issue or if a Provider re-render often and has expensive consumer.
- Components that use consume the context but don't necessarily read the state will still re-render.
- Keep unrelated data in separate Context to avoid the unnecessary re-rendering of consumers that
  don't need that data
- Context isn't alway the best choice for state management. For state that changes frequently
  libraries like redux are better. State management in Context is best for state that doesn't change
  so frequently and are needed widely. Context is also a great way to limit what parts of your app
  have access to certain values.
*/
