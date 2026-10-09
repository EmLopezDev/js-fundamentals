interface User3 {
    id: number;
    name: string;
}

interface Admin3 {
    id: number;
    name: string;
    permissions: string[];
}

const admin3: Admin3 = {
    id: 1,
    name: "Sarah",
    permissions: ["read", "write"],
};

const user3: User3 = admin3; // Valid - The admin3 object contains every property required by User3,
// with compatible types. The extra permissions property does not prevent assignment.

/*
Structural typing is a type compatibility system where TypeScript determines whether values are
assignable based on their structure (the properties and types they contain), rather than requiring
them to share the same explicitly declared type name.

- Shape-based compatibility: TypeScript checks whether required properties exist with compatible
  types.
- Type names aren't required to match: Different interfaces or type aliases can describe compatible
  structures.
- Extra properties are often allowed: A value can have more properties than the target type
  requires.
- Missing required properties cause errors: A value must satisfy the target type's requirements.
- Structural sub-typing: A more detailed object shape can often be assigned to a less detailed
  compatible shape.
- Excess property checks: Fresh object literals receive additional checks for unexpected properties.
*/
