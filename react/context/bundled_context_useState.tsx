import { createContext, useContext, useState, type ReactNode } from "react";
/*
Bundling All parts of Context with useState

In real apps with relatively simple state management, all three parts are usually bundled into one
dedicated file including useState so the rest of the app only needs two things: a Provider to wrap
the tree and a hook to read from it.
*/

// CartContext.tsx
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
    // children represents all the components that will be wrapped by this Provider
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
}

// Wrapping in Provider
function Header() {
    return <p>Header</p>;
}

function ProductPage() {
    return <p>Product Page</p>;
}

function App() {
    return (
        <CartProvider>
            <Header />
            <ProductPage />
        </CartProvider>
    );
}

// CartBadge.tsx (inside Header)

// import { useCart } from "./CartContext";
function CartBadge() {
    const { cartCount } = useCart();
    return <span>Cart ({cartCount})</span>;
}

// AddToCartButton.tsx (deep inside ProductPage)

// import { useCart } from "./CartContext";
function AddToCartButton() {
    const { addItem } = useCart();
    return <button onClick={addItem}>Add to cart</button>;
}

/*
What happens, step by step

1. App renders CartProvider. CartProvider runs useState(0), so cartCount is 0.
2. It builds the value { cartCount: 0, addItem } and renders the Provider with it.
3. Header and ProductPage are passed in as children, so they sit inside the Provider’s subtree.
4. CartBadge calls useCart(), which calls useContext and finds the nearest Provider. It reads
   cartCount as 0.
5. The user clicks the button in AddToCartButton. It calls addItem, which calls setCartCount.
6. CartProvider re-renders with cartCount as 1 and creates a new value. React sees the Provider’s
   value changed, so consumers re-render. CartBadge now shows Cart (1).

*/
