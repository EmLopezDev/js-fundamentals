/*
A polyfill is JavaScript code that recreates a feature that an environment doesn't support natively.

Imagine JavaScript adds a new method called someNewMethod(). Modern browsers will most likely
understand it, but an older browser likely won't.

A polyfill essentially says:

"If the environment doesn't provide this feature, I'll provide an implementation myself."

Metal model:

Polyfill = fill in a missing JavaScript feature.
*/

// Conceptually
if (!someNewMethod) {
    // create our own implementation
}

/*
Example:

Today we can use Array.prototype.includes(). But imagine when .includes() was first introduced and
older browsers at that time did not recognize this method. Developers then had to create a polyfill
for that method.
*/

// Modern browsers back then
const numbers = [10, 20, 30];

numbers.includes(20); // true

// Pollyfill for older browsers
if (!Array.prototype.includes) {
    Array.prototype.includes = function (value) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return true;
            }
        }

        return false;
    };
}
// We first check if this method exists if so we leave it alone, if not we supply it.

/*
Why is this important for interviews?

An interviewer probably isn't concerned that you're going to spend your job recreating
Promise.all(). Instead they are testing whether you understand how it works underneath. For example
if an interviewer says: "Implement your own version of Promise.all()". They are testing several
things at once:

Do you understand Promises?
        ↓
Do you understand arrays?
        ↓
Can you preserve input order?
        ↓
Can you track async completion?
        ↓
Can you handle rejection?
        ↓
Can you implement the behavior yourself?

Side Note:

Polyfill is different from Implementation. Polyfill is code that provides a JavaScript feature when
the environment doesn't natively support it. Implementation is recreating functionality yourself to
demonstrate that you understand how it works.

Array.prototypes  <--- Pollyfill: native JavaScript method that is potentially unsupported
        vs
debounce(), throttle(), curry() <--- Implementation: methods we create for our use case

Also, interview implementations don't always need to recreate the entire specification. Real
built-in methods can have a lot of edge cases, the purpose is to demonstrate you understand the core
behavior. You can mention: "This is a simplified implementation. A production-complete polyfill
would need to account for additional specification edge cases."
*/
