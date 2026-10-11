/*
Tuples with Generics ([T, U])

A tuple is an array type that specifies element types by position, usually with a fixed number of
elements.
*/

// Example 1
type Results = [string, number, boolean];

const results: Results = ["Sarah", 25, true];

// Example 2

type Results2 = [string, number, boolean?];

const results2: Results2 = ["John", 30]; // the third value is optional

// Example 3

function createPair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

/*
- [string, number] is a tuple; (string | number)[] is a general array.
- Tuple positions have specific types.
- Optional elements use ?; rest elements use ....
- Tuples are ordinary arrays at runtime, so TypeScript's tuple constraints do not guarantee runtime
  immutability.
*/
