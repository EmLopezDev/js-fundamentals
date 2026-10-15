import { useState } from "react";

function Counter({ label }: { label: string }) {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount((c) => c + 1)}>
            {label}: {count}
        </button>
    );
}

function App() {
    const [showFirst, setShowFirst] = useState(true);

    return (
        <div>
            {showFirst ? <Counter label="First" /> : <Counter label="Second" />}

            <button onClick={() => setShowFirst((v) => !v)}>Switch</button>
        </div>
    );
}
