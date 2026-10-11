/*
A generic constraint restricts which types can be used with a generic parameter.

`T extends SomeType` means T must satisfy the requirements of SomeType.
*/

// Example 1 `T` must have a length property of type number
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

getLength("hello"); // 5
getLength([1, 2, 3]); // 3
getLength({ length: 8 }); // 8
getLength(100); // Error - 100 doesn't have a length property

// Example 2 - `T` must have an id property of type number
function processRecord<T extends { id: number }>(record: T): T {
    console.log(record.id);
    return record;
}

const resultRecord = processRecord({
    id: 10, // Valid - has an id property with a value of type number
    username: "Sarah",
    isAdmin: true,
});
// result retains all three properties.

/*
- extends restricts acceptable types; it does not add properties.
- TypeScript uses structural typing: any type satisfying the required shape is valid.
- T retains additional properties beyond the constraint.
- Constraints are checked at compile time, not through runtime prototype inspection.
*/
