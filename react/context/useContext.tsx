import { createContext, ReactNode, useContext, useState } from "react";
/*
useContext

useContext() is a React hook that let's children components of a Context Provider read the current
value of that Context.
*/

const CartContext = createContext(0);

function CartButton() {
    const cartCount = useContext(CartContext);

    return <button>Items: {cartCount}</button>;
}
/*
In the above example useContext is asking for the current value of CartContext. React looks for the
nearest matching Provider above the component in the render tree. If the nearest Provider supplies
a value cartCount will be that value. If no matching Provider exists above the component, React
returns the default value from createContext, which in the above example is 0.

Multiple components can consume the same Context
*/

function App() {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartContext.Provider value={cartCount}>
            <Header />
            <CartSummary />
            <button onClick={() => setCartCount((count) => count + 1)}>Add item</button>
        </CartContext.Provider>
    );
}

function Header() {
    const count = useContext(CartContext);
    return <p>Header cart: {count}</p>;
}

function CartSummary() {
    const count = useContext(CartContext);
    return <p>Cart summary: {count}</p>;
}
/*
In the example above both Header and CartSummary are consuming the CartContext through useContext.
When the button in App is clicked and cartCount is updated, the Provider will receive that updated
value, it will then notify Header and CartSummary of the change which they will re-render to show
the updated value.

Note: a Provider cannot consume its own context meaning you cannot call useContext(CartContext)
within the CartContext.Provider.


Handling a missing/null Provider in TypeScript

Because the Context value can be null, TypeScript will require you to handle that possibility. A
common approach is to create a custom hook.
*/

type CartContextValue = {
    cartCount: number;
    addItem: () => void;
};

const CartContext2 = createContext<CartContextValue | null>(null);

// custom hook that consumes the Context if there is one or throws an Error
function useCart() {
    const context = useContext(CartContext2);

    if (context === null) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}

function CartSummary2() {
    const { cartCount, addItem } = useCart();

    return <button onClick={addItem}>Items: {cartCount}</button>;
}

/*
In the example above useCart() is a custom hook that consumes the Context with useContext, if there
is a CartContextValue available then useCart will pass along the context, if not useCart() will
throw an Error. This is a great way to centralize Context access and validate that a Provider
exists.


Nested Providers

When there are nested Providers the key take away is that useContext() in the children component
will read the value from the nearest matching Provider above it.
*/

const ThemeContext = createContext("light");

function App3() {
    return (
        <ThemeContext.Provider value="dark">
            <Page />
        </ThemeContext.Provider>
    );
}

function Page() {
    return (
        <>
            <ThemeContext.Provider value="dark">
                <AppLayout>
                    <ThemeContext.Provider value="light">
                        <DocumentPreview />
                    </ThemeContext.Provider>
                </AppLayout>
            </ThemeContext.Provider>
        </>
    );
}

function AppLayout({ children }: { children: ReactNode }) {
    const theme = useContext(ThemeContext);
    return <div style={{ backgroundColor: `${theme}` }}>{children}</div>;
}

function DocumentPreview() {
    const theme = useContext(ThemeContext);
    return <p>{theme}</p>;
}

/*
In the example above DocumentPreview will read the ThemeContext value from the Provider nearest to
it which would be the one with the value of "light", while AppLayout will read from the one above it
with the value of "dark"
*/
