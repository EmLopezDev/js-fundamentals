type ID = string | number;

type User2 = {
    id: ID;
    name: string;
    email?: string;
};

type Admin2 = User2 & {
    permissions: string[];
};

type Status = "pending" | "approved" | "rejected";

type Coordinates = [number, number];

type Greeting = (name: string) => string;

/*
A type alias is a TypeScript construct that assigns a name to a type. It can represent object
shapes, primitives, unions, intersections, tuples, function types, and other type expressions.

- Object shapes: Define properties and methods, similar to interfaces.
- Union types (|): Allow a value to be one of multiple types.
- Intersection types (&): Combine multiple types into one.
- Primitive aliases: Create names for primitive types.
- Tuple types: Define arrays with specific element positions and types.
- Function types: Describe function parameters and return types.
- Optional and readonly properties: Supported within object type aliases.
- Generics: Create reusable, parameterized types.
- No declaration merging: A type alias cannot be redeclared with the same name in the same scope.
- Compile-time only: Type aliases are removed during compilation.

Best used for:

- Defining unions or literal types.
- Combining types using intersections.
- Defining tuples or function types.
- Building utility or conditional types.
*/
