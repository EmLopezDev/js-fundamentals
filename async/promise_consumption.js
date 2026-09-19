/*
In order to interact with the result of a Promise you must attach consumer methods to catch the
success value or the failure reason.

1. Using .then(), .catch(), and .finally()
- .then(): Runs when the promise is successfully fulfilled.
- .catch(): Runs if the promise is rejected.
- .finally(): Runs after the promise is settled, regardless of whether it succeeded or failed (great
  for cleanup tasks like stopping a loading spinner).
*/

checkServerStatus
    .then((message) => {
        console.log("Success: " + message);
    })
    .catch((error) => {
        console.error("Error: " + error);
    })
    .finally(() => {
        console.log("Operation complete.");
    });

/*
2. Using async / await (Modern Approach)

The async/await syntax is a cleaner, more readable way to handle promises that looks like
traditional synchronous code. You use a try...catch block to handle any rejections.
*/

async function getStatus() {
    try {
        const message = await checkServerStatus; // Pauses here until promise resolves
        console.log("Success: " + message);
    } catch (error) {
        console.error("Error: " + error);
    } finally {
        console.log("Operation complete.");
    }
}

getStatus();

/*
Functional Differences

1. Variable Scoping and Shared State
- async/await wins: When you have a multi-step asynchronous process where step 3 depends on data
  from both step 1 and step 2, async/await keeps all variables in the same block scope.
- The .then() alternative: With .then(), variables resolved in early steps fall out of scope in
  later steps unless you resort to messy nesting (creating a new version of callback hell) or
  declare awkward mutable variables outside the chain.
*/

// async/await: Clean, flat scope
async function getUserData() {
    const user = await fetchUser();
    const preferences = await fetchPreferences(user.id);
    return renderProfile(user, preferences); // Both variables are easily accessible
}

/*
2. Error Handling Precision
- .then().catch() wins: It allows for highly isolated, local error handling on a single promise line
  without breaking execution.
- async/await caveat: async/await relies on try/catch blocks. If you place five await expressions
  inside one large try block, a failure in any of them triggers the same catch block. Pinpointing
  exactly which line failed requires nesting multiple try/catch blocks inside each other, which
  quickly becomes verbose.
*/

// .then().catch(): Precise, inline fallback
const avatar = await fetchAvatar().catch(() => defaultAvatar);

/*
3. Concurrent Initialization vs. Sequential Execution
- .then() trait: Calling a function that returns a promise immediately starts the underlying
  operation in the background without pausing code execution.
- async/await pitfall: A common mistake with async/await is accidentally serializing independent
  operations, turning parallel work into slow, sequential execution.
*/

// Slow sequential execution (Accidental anti-pattern)
const staticData = await fetchStaticData(); // Pauses completely
const dynamicData = await fetchDynamicData(); // Doesn't start until step 1 finishes

// Fast concurrent execution using async/await properly
const staticPromise = fetchStaticData(); // Starts immediately
const dynamicPromise = fetchDynamicData(); // Starts immediately
const [staticData1, dynamicData1] = await Promise.all([staticPromise, dynamicPromise]);

/*
When to Choose Which

Use .then().catch() when:
- You want a quick, "fire-and-forget" background task where you don't need to pause the rest of the
  function execution.
- You need an inline default value if a specific promise fails (const data = await
  getData().catch(() => fallback)).
- You are working strictly within functional chains or stream processing.

Use async/await when:
- You are writing complex business logic with loops (for, while) and conditional branches (if/else)
  that depend on async data.
- You need to share multiple variables across long, sequential asynchronous operations.
- You want cleaner, more maintainable stack traces during debugging, as modern engines map await
  positions accurately.
*/
