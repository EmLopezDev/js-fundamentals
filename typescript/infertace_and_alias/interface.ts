interface User {
    id: number;
    name: string;
    email?: string;
    readonly createdAt: Date;
    greet(): string;
}

interface User {
    address: {
        city: string;
    };
}

interface Admin extends User {
    permissions: string[];
}

const admin: Admin = {
    id: 1,
    name: "Sarah",
    createdAt: new Date(),
    permissions: ["read", "write"],
    greet() {
        return `Hello, ${this.name}`;
    },
    address: {
        city: "New York",
    },
};

/*
An interface is a TypeScript construct used to define the expected structure (shape) of an object,
including its properties, methods, and their types. Interfaces establish contracts that values must
satisfy during static type checking.

- Object shapes: Define required properties and their types.
- Optional properties (?): Allow properties to be omitted.
- Readonly properties (readonly): Prevent reassignment through the interface.
- Methods: Define method signatures, parameters, and return types.
- Extension (extends): Create interfaces that inherit properties from other interfaces or compatible
  object types.
- Declaration merging: Multiple declarations with the same interface name can be combined.
- Structural typing: Objects are checked based on their structure rather than their declared type
  names.
- Compile-time only: Interfaces are removed when TypeScript is compiled into JavaScript.

Best used for:

- Defining object contracts, such as user models or React component props.
- Working with object hierarchies using extends.
- Declaration merging is useful, such as extending library types.
*/
