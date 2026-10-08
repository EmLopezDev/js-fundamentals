/*
Compile time: The stage before code execution when TypeScript analyzes the code and reports type
errors. The compiler can also transform TypeScript into JavaScript.

Runtime: The stage when the generated JavaScript actually executes.

Important: TypeScript provides compile-time type checking, not runtime type enforcement. Its types
are erased during compilation, meaning JavaScript does not enforce them when running.
*/

// Compile time error - type mismatch
let age: number = 25;

age = "Hello"; // TypeScript error

/*
- age is declared as a number.
- Assigning a string violates its type.
- TypeScript reports an error during static type checking.
- If JavaScript is still emitted, the assignment can execute because JavaScript doesn't enforce the
  TypeScript annotation.
*/

// Runtime error
function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}

console.log(divide(10, 0));

/*
- TypeScript sees two valid number arguments.
- No static type error is reported.
- At runtime, b === 0 evaluates to true.
- The function throws an error during execution.
*/

// Type erasure
// Before compilation
function greetTyped(name: string): string {
    return `Hi, ${name}`;
}
// After compilation
function greetJS(name) {
    return `Hi, ${name}`;
}

/*
- TypeScript checks the parameter and return types before execution.
- During compilation, type annotations are removed.
- The resulting JavaScript has no knowledge of the string annotations.
*/
