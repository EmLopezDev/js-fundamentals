/*
Time complexity = how the amount of work grows as the input grows.
- Worst-case — maximum amount of work, usually the default in interviews.
- Average-case — expected amount of work across typical inputs.
- Best-case — minimum amount of work.
- Amortized — average cost of an operation across a sequence of operations, such as dynamic-array
  push().

Space complexity = memory used overall.
- Auxiliary space - extra/helper memory used by the algorithm
- Output space - memory required for the returned answer
- Total space - both
*/

/*
BIG O TIME & SPACE COMPLEXITY — INTERVIEW CHEAT SHEET


==================================================
1. WHAT BIG O MEANS
==================================================

Big O describes how an algorithm scales as the input (n) gets larger.

You usually analyze two things:

Time Complexity  → How does the amount of work grow?
Space Complexity → How does the extra memory used grow?

We care about growth, not exact numbers.

O(2n)       → O(n)
O(5n + 10)  → O(n)
O(n² + n)   → O(n²)

RULE:
Drop constants and keep the fastest-growing term.


==================================================
TIME COMPLEXITY
==================================================


==================================================
2. O(1) — CONSTANT TIME
==================================================

The amount of work does NOT grow with n.

Example:

const first = nums[0];

Other examples:

map.get(key);
map.set(key, value);
set.has(value);

Average-case Map/Set lookup and insertion are O(1).

THINK:

"No matter how large the input gets, this operation takes roughly the same amount of work."


==================================================
3. O(n) — LINEAR TIME
==================================================

Work grows proportionally with the input.

Example:

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}

If:

n = 10     → ~10 operations
n = 100    → ~100 operations
n = 1,000  → ~1,000 operations

THINK:

"I may have to look at every element once."


==================================================
4. SEQUENTIAL WORK ADDS
==================================================

If operations happen one after another, add their complexities.

Example:

for (const num of nums) {
  // O(n)
}

for (const num of nums) {
  // O(n)
}

That's:

O(n) + O(n)
= O(2n)
= O(n)

NOT O(n²).

MEMORY RULE:

Sequential work adds.

Another example:

Loop through string A → O(n)
Loop through string B → O(n)

O(n) + O(n)
= O(2n)
= O(n)


==================================================
5. NESTED WORK CAN MULTIPLY
==================================================

When one loop runs inside another loop, the work can multiply.

Example:

for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < nums.length; j++) {
    // work
  }
}

For each of n elements, we potentially process n elements:

n × n = n²

O(n²)

MEMORY RULE:

Sequential work adds.
Nested work can multiply.

This is why brute-force Two Sum was:

O(n²)


==================================================
6. NESTED DOES NOT AUTOMATICALLY MEAN O(n²)
==================================================

Look at how many times each loop actually runs.

Example:

for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < 5; j++) {
    // work
  }
}

The inner loop always runs only 5 times:

n × 5
= 5n
= O(n)

The inner loop must also scale with n to produce O(n²).


==================================================
7. O(log n) — LOGARITHMIC TIME
==================================================

Usually happens when the problem gets significantly smaller each step.

Classic example: binary search.

1,000 elements
↓
500
↓
250
↓
125
↓
...

Instead of checking every element, you repeatedly eliminate half.

O(log n)

MEMORY RULE:

If you're repeatedly cutting the remaining problem in half, think O(log n).


==================================================
8. O(n log n) — COMMON SORTING COMPLEXITY
==================================================

Efficient comparison-based sorting commonly gives:

O(n log n)

So when you see:

array.sort();

A good interview instinct is:

"Sorting — think O(n log n)."

Example from Valid Anagram:

s.split("").sort().join("");
t.split("").sort().join("");

Sorting dominates:

O(n log n) + O(n log n)

= O(2n log n)

= O(n log n)

MEMORY RULE:

When you see sorting, O(n log n) should come to mind.


==================================================
9. O(n²) — QUADRATIC TIME
==================================================

Common with nested loops where both depend on n.

Example:

for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    // compare
  }
}

Even though the inner loop gets shorter:

n + (n-1) + (n-2) + ...

it still grows quadratically:

O(n²)

Examples:

Brute-force Contains Duplicate → O(n²)
Brute-force Two Sum            → O(n²)


==================================================
10. O(2ⁿ) — EXPONENTIAL TIME
==================================================

Often appears in recursive algorithms where each call creates multiple additional calls.

Simplified example:

function recursive(n) {
  recursive(n - 1);
  recursive(n - 1);
}

Each call creates two more calls:

        n
      /   \
    n-1   n-1
    / \   / \
   ...   ...

The number of calls can grow exponentially.

O(2ⁿ)

This gets expensive very quickly.


==================================================
11. KEEP THE DOMINANT TERM
==================================================

If an algorithm does:

O(n²) + O(n) + O(1)

you report:

O(n²)

Because as n becomes large, n² dominates.

Examples:

O(n + 5)         → O(n)

O(3n)            → O(n)

O(n² + n)        → O(n²)

O(n log n + n)   → O(n log n)

O(2n² + 100n)    → O(n²)

MEMORY RULE:

Drop constants.
Drop smaller terms.
Keep the dominant growth.


==================================================
12. DIFFERENT INPUTS CAN USE DIFFERENT VARIABLES
==================================================

Don't automatically call everything n.

Example:

for (const item of arrayA) {
  // ...
}

for (const item of arrayB) {
  // ...
}

If:

arrayA length = n
arrayB length = m

Then:

O(n + m)

Not necessarily:

O(n)

Similarly:

for (const a of arrayA) {
  for (const b of arrayB) {
    // ...
  }
}

is:

O(n × m)


==================================================
SPACE COMPLEXITY
==================================================


==================================================
13. ASK ONE MAIN QUESTION
==================================================

When calculating extra/auxiliary space, ask:

"Does the additional memory my algorithm creates grow as the input grows?"

If no:

O(1)

If yes, determine how fast it grows.


==================================================
14. O(1) SPACE — CONSTANT EXTRA MEMORY
==================================================

Example:

let sum = 0;
let i = 0;
let result = false;

Regardless of whether the input contains 10 or 10 million elements, you're still using a fixed
number of variables.

O(1)

Example:

function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

The loops make the TIME:

O(n²)

But i and j don't grow with n.

Therefore:

Time  → O(n²)
Space → O(1)

IMPORTANT:

Lots of operations do not necessarily mean lots of memory.

Time and space must be analyzed separately.


==================================================
15. O(n) SPACE — MEMORY GROWS WITH INPUT
==================================================

Example:

const seen = new Set();

for (const num of nums) {
  seen.add(num);
}

In the worst case, the Set contains all n elements:

n input elements
↓
up to n stored elements
↓
O(n) space

Same idea with:

const map = new Map();

If the Map can grow with the input:

O(n) space


==================================================
16. CREATING A COPY CAN COST O(n) SPACE
==================================================

Example:

const copy = [...nums];

If nums contains n elements, the copy contains n elements:

O(n) space

Likewise:

const chars = str.split("");

creates an array proportional to the string:

O(n) space


==================================================
17. TWO O(n) STRUCTURES ARE STILL O(n)
==================================================

Suppose you create:

const a = [...nums];
const b = [...nums];

That's approximately:

n + n
= 2n

Drop the constant:

O(n)

NOT O(n²).


==================================================
18. RECURSION CAN USE STACK SPACE
==================================================

Recursion creates call-stack frames.

Example:

function countdown(n) {
  if (n === 0) return;

  countdown(n - 1);
}

Before the calls return, the stack can look like:

countdown(5)
countdown(4)
countdown(3)
countdown(2)
countdown(1)
countdown(0)

The depth grows with n.

Therefore:

Space → O(n)

Even though you didn't explicitly create an array, Map, or object.

MEMORY RULE:

Recursion's call stack counts toward space complexity.


==================================================
19. TIME-SPACE TRADEOFFS
==================================================

Sometimes we deliberately use more memory to make an algorithm faster.

We saw this with both of today's problems:

Contains Duplicate

Brute:
Time  → O(n²)
Space → O(1)

Set:
Time  → O(n)
Space → O(n)


Two Sum

Brute:
Time  → O(n²)
Space → O(1)

Map:
Time  → O(n)
Space → O(n)


We're essentially saying:

"I'll spend O(n) extra memory so I don't have to repeatedly search the array."

This is an extremely common DSA optimization pattern.


==================================================
20. COMMON JAVASCRIPT OPERATIONS — INTERVIEW MENTAL MODEL
==================================================

Array access:
arr[i]
→ O(1)

Object property access:
obj[key]
→ O(1) average

Map get/set/has:
→ O(1) average

Set add/has:
→ O(1) average

Array push/pop:
→ O(1) amortized

Array shift/unshift:
→ O(n)

Array includes/indexOf:
→ O(n)

Array find/findIndex:
→ O(n)

Array map/filter/reduce:
→ O(n)

Array slice/spread copy:
→ O(n)

String split/join:
→ O(n)

Sorting:
→ think O(n log n)

Binary search:
→ O(log n)


BE CAREFUL:

A built-in method may hide a loop.

For example:

for (const num of nums) {        // O(n)
  nums.includes(num);            // O(n)
}

Even though you only wrote one visible loop, includes() performs linear work too:

O(n) × O(n)
= O(n²)

VERY IMPORTANT INTERVIEW RULE:

Count the work being performed, not just the loops you can see.


==================================================
21. QUICK COMPLEXITY RANKING
==================================================

From generally better scaling to worse scaling:

O(1)         Constant
 ↓
O(log n)     Logarithmic
 ↓
O(n)         Linear
 ↓
O(n log n)   Linearithmic
 ↓
O(n²)        Quadratic
 ↓
O(2ⁿ)        Exponential
 ↓
O(n!)        Factorial


For the kinds of interview problems we're currently practicing, you'll see these constantly:

O(1)
O(log n)
O(n)
O(n log n)
O(n²)


==================================================
22. FAST INTERVIEW CHECKLIST
==================================================

When someone asks:

"What's the time and space complexity?"

Go through this mentally.


TIME:

1. How many times do I process the input?

2. Are operations sequential?
   → ADD

3. Are operations nested/dependent?
   → potentially MULTIPLY

4. Is there sorting?
   → think O(n log n)

5. Is the problem repeatedly cut in half?
   → think O(log n)

6. Am I calling a built-in method inside a loop?
   → include that method's complexity

7. What is the dominant term?
   → discard constants and smaller terms


SPACE:

1. What additional memory am I creating?

2. Does it grow with n?

   No → O(1)

   Yes → How much?

   Array with n items → O(n)
   Map with n entries → O(n)
   Set with n entries → O(n)
   Copied string/array → often O(n)

3. Am I using recursion?
   → count call-stack depth

4. Ignore fixed-size variables.


==================================================
23. THE RULES TO MEMORIZE
==================================================

TIME:

Sequential work ADDS.

Nested/dependent work can MULTIPLY.

Sorting → think O(n log n).

Repeatedly cutting the problem in half → think O(log n).

A loop through n elements → usually O(n).

Nested loops that both scale with n → usually O(n²).

Built-in methods still perform work.

Drop constants.

Drop smaller terms.

Keep the dominant term.


SPACE:

Ask:

"Does my EXTRA memory grow with n?"

Fixed number of variables → O(1).

Array/Map/Set that can grow to n → O(n).

Two O(n) structures → still O(n).

Recursive call stack counts as space.

Time complexity and space complexity are separate.


OPTIMIZATION:

Repeated searching often causes O(n²).

A Map or Set can often trade:

O(n) extra space

for

O(n) average time.


==================================================
ONE SENTENCE TO REMEMBER
==================================================

Time = how the amount of work grows.

Space = how the extra memory grows.

Sequential work adds, nested work can multiply, and Big O keeps only the dominant growth.
*/
