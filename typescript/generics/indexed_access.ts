/*
Indexed Access Types (T[K])

An indexed access type retrieves the type of a property from another type.
*/

// Example 1
interface Employee {
    id: number;
    name: string;
    isActive: boolean;
}

type EmployeeName = Employee["name"]; // string
type EmployeeActive = Employee["isActive"]; // boolean

// Example 2
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const employee: Employee = {
    id: 1,
    name: "Sarah",
    isActive: true,
};

const nameType = getProperty(employee, "name"); // string

const activeType = getProperty(employee, "isActive"); // boolean

/*
- T: the object type.
- keyof T: its valid property keys.
- K extends keyof T: restricts K to those keys.
- T[K]: the type of the selected property.
- obj[key]: the actual property value at runtime.

T[K] represents a type, not the value itself. Using K preserves the relationship between the
requested key and the return type.
*/

/*
All Property Value Types (T[keyof T])

`T[keyof T]` produces a union of all property value types belonging to T.
*/

// Example 1
interface Server {
    hostname: string;
    port: number;
    secure: boolean;
}

type ServerKeys = keyof Server; // "hostname" | "port" | "secure"

type ServerValues = Server[keyof Server]; // string | number | boolean

// Example 2
const NOTIFICATIONS = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
} as const;

type NotificationType = (typeof NOTIFICATIONS)[keyof typeof NOTIFICATIONS];
// "success" | "error" | "warning"

/*
- T[keyof T] collects all possible property value types.
- It does not preserve which value belongs to which key.
- TypeScript simplifies redundant unions: string | "hello" becomes string.
- Use T[K] instead when you need the return type to correspond to a particular selected key.
*/
