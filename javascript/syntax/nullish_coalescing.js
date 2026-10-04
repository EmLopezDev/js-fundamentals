/*
The JavaScript nullish coalescing operator (??) is a logical operator that returns its right-hand
side operand when its left-hand side operand is null or undefined. Otherwise, it returns its
left-hand side operand.
*/

const result = leftExpression ?? rightExpression;
/*
If leftExpression is null or undefined, result will be rightExpression. If leftExpression is
anything else including falsy values, result will be leftExpression.
*/

const result1 = false ?? true;

// This will return false. False although a falsy value is neither undefined or null therefore
// it is a valid return in nullish coalescing

const result2 = null ?? 5;
// This will return 5 since the left side is null

/*
Nullish Coalescing Assignment (??=): You can also use it to quickly assign a default value to an
existing variable only if that variable is currently nullish.
*/

let config = null;
config ??= { theme: "dark" }; // config becomes { theme: 'dark' }

/*
The Crucial Difference: ?? vs ||

Developers frequently used the logical OR (||) operator to assign default values before ?? was
introduced. However, || falls back to the right side for any falsy value (including 0, false, NaN,
and "").
*/

const userScore = 0;

// Buggy behavior with ||
const finalScoreOR = userScore || 10;
console.log(finalScoreOR); // Output: 10 (Because 0 is falsy, it overwrote the actual score)

// Correct behavior with ??
const finalScoreNullish = userScore ?? 10;
console.log(finalScoreNullish); // Output: 0 (Because 0 is not null or undefined)
