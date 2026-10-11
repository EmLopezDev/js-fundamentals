/*
Single Generic Parameter (<T>)

Generics allow functions, interfaces, type aliases, and classes to work with different types while
preserving type safety.

T is a type parameter (a placeholder for a type). TypeScript can infer it from the arguments or you
can specify it explicitly
*/

// Example 1
function identity<T>(value: T): T {
    return value;
}

const sarah = identity("Sarah"); // string
const age = identity(25); // number

// Example 2
interface User {
    id: number;
    name: string;
}

interface ApiResponse<T> {
    data: T;
    success: boolean;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

/*
- Generics preserve relationships between input and output types.
- They are not limited to functions; interfaces, aliases, classes, and React hooks also use them.
- Unlike any, generics retain type information.
- Use generics when code must be reusable across types, not when a simple fixed type is sufficient.
*/

/*
Multiple Generic Parameters (<T, U>)

Multiple generic parameters allow different values to have independently inferred types.
*/

// Example 1
function createPair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const pair = createPair("hello", 42); // [string, number]

// Example 2
function combineData<T, U>(user: T, settings: U) {
    return { user, settings };
}

const result = combineData({ id: 1, name: "Sarah" }, { darkMode: true });
// Both object types are preserved.

/*
- Each parameter can represent a different type.
- Types are usually inferred automatically.
- Explicit arguments such as createPair<number, string>(10, "ten") must match the values passed.
*/
