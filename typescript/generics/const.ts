/*
Literal Preservation (as const)

`as const` tells TypeScript to preserve literal types rather than widening them, and marks object
properties readonly and array literals as readonly tuples at the type level.
*/

// Example 1
const settings = {
    mode: "dark",
}; // settings.mode is string

const fixedSettings = {
    mode: "dark",
} as const; // fixedSettings.mode is "dark"

// Example 2
const ROLES = {
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
} as const;

type Role = (typeof ROLES)[keyof typeof ROLES];
// "admin" | "editor" | "viewer"

const role: Role = "admin"; // Valid
const invalid: Role = "guest"; // Error

/*
- Without as const, mutable object properties typically widen from "admin" to string.
- as const preserves specific literal values.
- It doesn't freeze objects at runtime.
- It is especially useful for configuration objects, action names, statuses, and roles.
*/
