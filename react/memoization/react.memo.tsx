import { useState, memo } from "react";
/*
React.memo()

When a component re-renders, Reacts also re-renders all of its children even if their props didn't
change. React.memo prevents the unnecessary re-rendering of components. Before re-rendering a
component React compares its new props to its previous props. If they are all the same, Reacts skips
re-rendering the component and reuses the last result.
*/

interface Product {
    id: number;
    name: string;
}

const products = [
    { id: 1, name: "" },
    { id: 2, name: "" },
];

const ProductGrid = memo(function ProductGrid({
    products,
}: {
    products: Product[];
    options?: {};
    onSelect?: (id: number) => void;
}) {
    console.log("ProductGrid rendered");
    return (
        <ul>
            {products.map((p) => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    );
});

function ProductPage() {
    const [search, setSearch] = useState("");

    return (
        <>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ProductGrid products={products} />
        </>
    );
}
/*
1. When the user types in the search box in the ProductPage, ProductPage re-renders to show the
   updated state.
2. React gets to ProductGrid and compares the new products prop to the previous one using Object.is
   which checks the reference.
3. Since the array reference hasn't changed, React skips ProductGrid.

Some things to know:
1. memo only affects re-renders caused by the parent component. If the components own state or a
   value being consumed from a Context changes the component will re-render regardless.
2. This is an optimization. Meaning it isn't something you should always use. React has to run the
   comparison each time so for a small component it might not be beneficial. Also if props aren't
   mostly stable then it would defeat the purpose.
3. This doesn't work with values created during render like objects/arrays/function which are
   created in the component's body or inline because a new reference is created on each render as
   shown in the example below. This would only work if the object/array/function reference doesn't
   change between renders.
*/

function openProduct(id: number) {
    console.log("id", id);
}

<ProductGrid
    products={products} // same reference: fine
    options={{ showPrices: true }} // new object every render: breaks memo
    onSelect={(id) => openProduct(id)} // new function every render: breaks memo
/>;

function ProductPage2() {
    const id = 1;
    const obj = { showPrice: false }; // new object every render: breaks memo

    // new function every render: breaks memo
    function openProductById() {
        openProduct(id);
    }

    return (
        <ProductGrid
            products={products} // same reference: fine
            options={obj}
            onSelect={openProductById}
        />
    );
}

/*
Placing the object/array/function outside the function body as show below will only create it
once which will allow it to keep its reference and prevent React from re-rendering.
*/
const id = 1;

const obj2 = { showPrice: false }; // object is created once works with memo

// function is created once works with memo
function openProductById() {
    openProduct(id);
}

function ProductPage3() {
    return (
        <ProductGrid
            products={products} // same reference: fine
            options={obj2}
            onSelect={openProductById}
        />
    );
}
