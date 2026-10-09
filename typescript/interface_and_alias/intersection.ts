/*
An intersection creates a type that must satisfy all the combined type requirements simultaneously.

Use an intersection when you want to combine compatible object structures or enforce multiple
constraints.
*/

type Product = {
    id: number;
    price: number;
};

type Inventory = {
    stock: number;
    warehouse: string;
};

type StockedProduct = Product & Inventory;

const item: StockedProduct = {
    id: 101,
    price: 49.99,
    stock: 25,
    warehouse: "NY",
};

type PermissionA = "read" | "write";
type PermissionB = "read" | "delete";

type SharedPermission = PermissionA & PermissionB;
// "read"

const permission: SharedPermission = "read"; // ✅
const other: SharedPermission = "write"; // ❌

type A = { value: string };
type B = { value: number };

type Combined = A & B;

// A value cannot simultaneously be a primitive string and a number. So Combined["value"] is never

type C = { name: string };
type D = { name: string | null };

type Combined2 = C & D;

// null is excluded because it doesn't satisfy A (assuming strictNullChecks). So Combined["name"] is
// string
