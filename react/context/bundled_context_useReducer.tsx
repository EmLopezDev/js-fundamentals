import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
/*
Bundling All parts of Context with useReducer

In real apps with complex state management,  all three parts are usually bundled into one dedicated
file including useReducer so the rest of the app only needs two things: a Provider to wrap the tree
and a hook to read from it.
*/

// CartContext.tsx
type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

type CartAction =
    | { type: "addItem"; item: CartItem }
    | { type: "removeItem"; id: string }
    | { type: "changeQuantity"; id: string; quantity: number };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "addItem": {
            const exists = state.items.some((i) => i.id === action.item.id);
            return {
                items: exists
                    ? state.items.map((i) =>
                          i.id === action.item.id
                              ? { ...i, quantity: i.quantity + action.item.quantity }
                              : i,
                      )
                    : [...state.items, action.item],
            };
        }
        case "removeItem":
            return { items: state.items.filter((i) => i.id !== action.id) };
        case "changeQuantity":
            return {
                items: state.items
                    .map((i) => (i.id === action.id ? { ...i, quantity: action.quantity } : i))
                    .filter((i) => i.quantity > 0),
            };
        default: {
            const exhaustiveCheck: never = action;
            return exhaustiveCheck;
        }
    }
}

type CartContextValue = {
    state: CartState;
    dispatch: Dispatch<CartAction>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const contextValue = {
        state,
        dispatch,
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

// CartBadge.tsx (in the Header)
function CartBadge() {
    const { state } = useCart();
    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return <span>Cart ({totalItems})</span>;
}

// AddToCartButton.tsx (deep inside ProductPage)
function AddToCartButton({ product }: { product: Omit<CartItem, "quantity"> }) {
    const { dispatch } = useCart();

    return (
        <button onClick={() => dispatch({ type: "addItem", item: { ...product, quantity: 1 } })}>
            Add to cart
        </button>
    );
}

// CartLine.tsx (on the cart page)
function CartLine({ item }: { item: CartItem }) {
    const { dispatch } = useCart();

    return (
        <li>
            {item.name} × {item.quantity}
            <button
                onClick={() =>
                    dispatch({
                        type: "changeQuantity",
                        id: item.id,
                        quantity: item.quantity + 1,
                    })
                }
            >
                +
            </button>
            <button onClick={() => dispatch({ type: "removeItem", id: item.id })}>Remove</button>
        </li>
    );
}

/*
What happens, step by step

1. CartProvider renders and runs useReducer(cartReducer, { items: [] }). Initial state is an empty
   cart.
2. It provides { state, dispatch } to its subtree.
3. CartBadge calls useCart(), reads state, and shows Cart (0).
4. The user clicks “Add to cart”. AddToCartButton calls dispatch({ type: "addItem", ... }).
5. React runs cartReducer with the current state and that action. The reducer returns a new state
   object.
6. CartProvider re-renders with the new state and provides a new value. Consumers re-render.
   CartBadge now shows Cart (1).
*/
