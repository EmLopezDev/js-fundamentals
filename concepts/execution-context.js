/*
An execution context is the abstract environment created by the JavaScript engine to evaluate and
execute code. Think of it as a wrapper or container that holds all the necessary tools—like
variables, functions, and the value of this —needed to run the current block of code. Everything in
Javascript happens inside an execution context

The Three Types of Execution Context

Global Execution Context (GEC): This is the default or base context. It is created when your script
first loads. It creates the global object (window in browsers, global in Node.js) and sets up the
this keyword. There is only ever one GEC per program.

Function Execution Context (FEC): Every single time a function is called (invoked), the engine
creates a brand-new context specifically for that function. Each function call gets its own
independent context.

Eval Execution Context: Code executed inside an internal eval() function gets its own unique context
(rarely used due to safety risks).

The Two Phases of an Execution Context

Every execution context goes through a precise, two-phase lifecycle:

1. Creation Phase (Memory Allocation)

Before running a single line of code, the engine scans your script to "set up shop".

- It creates the Variable Environment to store variables and function arguments.
- Hoisting occurs here: Variables declared with var are allocated space and assigned a placeholder
value of undefined. Complete function declarations are stored entirely in memory.
- Variables declared with let and const are allocated space but left uninitialized, placing them in
a "Temporal Dead Zone" until execution reaches them.
- It sets up the Scope Chain (how a function looks outward for variables)
- It determines the value of the this keyword.
*/

// --- Memory Scan Step 2: The engine notes the identifier 'framework' and assigns it a default
// value of undefined.
var framework = "React";

// --- Memory Scan Step 4: The engine notes the identifier 'builder' and flags it as uninitialized
// (locking it in the TDZ).
let builder = "Vite";

// --- Memory Scan Step 1: The engine allocates memory for 'initializeProject' and stores the
// complete function body inside it.
function initializeProject() {
    console.log("Project setup successful!");
}

// --- Memory Scan Step 3: The engine notes 'launchServer'. Because it starts with 'var', it is
// initialized as undefined.
var launchServer = function () {
    console.log("Server is running on port 3000...");
};

// Memory State at the end of Phase 1.
const MemoryState = {
    initializeProject: initializeProject, // Fully usable function
    framework: undefined, // Placeholder set since created with var
    launchServer: undefined, // Placeholder set since created with var
    builder: "uninitialized", // Trapped in Temporal Dead Zone since created with let
};

/*
2. Execution Phase (Code Execution)

The engine acts as a single-threaded entity, executing code line by line.
- It assigns actual values to your variables.
- It executes function calls. If it hits a function call, it pauses the current context and spins up
a new Function Execution Context.
*/

// Execution Step 1: Reads 'framework' from memory (which is currently undefined) and prints it.
console.log(framework); // Output: undefined

// Execution Step 2: Looks up 'initializeProject' in memory, finds the full function body, and runs
// it.
initializeProject(); // Output: "Project setup successful!"

// Execution Step 3: Looks up 'framework' in memory and overwrites its value from 'undefined' to
// "React".
var framework = "React";

// Execution Step 4: Moves 'builder' out of the TDZ and assigns it the string value "Vite".
// Added 1 to variable name to avoid errors
let builder1 = "Vite";

// Execution Step 5: Reads 'builder' from memory (now safely holding "Vite") and prints it.
console.log(builder); // Output: "Vite"

// Execution Step 6: Skips this declaration because it was already fully stored in memory during
// Phase 1.
function initializeProject() {
    console.log("Project setup successful!");
}

// Execution Step 7: Looks up 'launchServer' in memory and overwrites its value from 'undefined' to
// the function expression.
var launchServer = function () {
    console.log("Server is running on port 3000...");
};

// Execution Step 8: Looks up 'launchServer' in memory, finds the function expression, and runs it.
launchServer(); // Output: "Server is running on port 3000..."

/*
The Execution Context Stack (Call Stack)

To manage the multiple contexts that spawn during a program, JavaScript uses a Call Stack. It
operates on a Last-In, First-Out (LIFO) data structural rule.

- The Global Execution Context is pushed to the bottom of the stack when the script starts.
- When a function is called, its Function Execution Context is pushed onto the top of the stack and
becomes the active context.
- When that function finishes running, its context is popped off the stack, and JavaScript resumes
where it left off in the context beneath it.

STEPS WILL BE FOR THIS CODE:
-----
console.log(framework);

initializeProject();

var framework = "React";

let builder1 = "Vite";

console.log(builder);

function initializeProject() { console.log("Project setup successful!");
}

var launchServer = function () { console.log("Server is running on port 3000...");
};

launchServer();
----
STEP 1: Script Starts Execution

The JavaScript engine creates the Global Execution Context (GEC) and pushes it onto the stack to
start evaluating the code file.

Call Stack:
-----------------------------
│ Global Context            │  <-- Active (Running line 1)
-----------------------------

Action: console.log(framework) reads undefined from global memory and prints it.

STEP 2: initializeProject() is called

The engine hits the invocation initializeProject(). It pauses the Global Context and pushes a new
Function Execution Context (FEC) onto the stack.

Call Stack:
-----------------------------
│ initializeProject Context │  <-- Active (Running the function body)
├───────────────────────────┤
│ Global Context            │  <-- Paused
-----------------------------

Action: The code inside the function runs, printing "Project setup successful!".

STEP 3: initializeProject() finishes

The function finishes its execution block. The engine pops the initializeProject context off the
stack and destroys it. Control drops back down to the Global Context.

Call Stack:
-----------------------------
│ Global Context            │  <-- Active (Resumes at Execution Step 3)
-----------------------------

STEP 4: Variable Assignments & Logs (Execution Steps 3, 4, 5, 6)

The engine continues moving straight down through the file line by line within the Global Context.

Call Stack:
-----------------------------
│ Global Context            │  <-- Active
-----------------------------
Actions:

- Updates framework to "React".
- Moves builder out of the TDZ and assigns it "Vite".
- Prints "Vite".
- Skips the function declaration block because its memory was handled in Phase 1.
- Updates launchServer from undefined to the actual function expression.

Step 5: launchServer() is Called (Execution Step 8)

The engine encounters the invocation launchServer(). It pauses the Global Context again and pushes a
new FEC for launchServer onto the top of the stack.

Call Stack:
-----------------------------
│ launchServer Context      │  <-- Active (Running the expression)
│ Global Context            │  <-- Paused
-----------------------------

Action: The expression executes its block, printing "Server is running on port 3000..."

Step 6: launchServer() Finishes & Script Ends

The function finishes. The engine pops launchServer off the stack. With no more code left to
evaluate in the file, the Global Context is popped off next, leaving the stack completely clear.

Call Stack:
---------------------
│   Empty Stack     │
---------------------
*/
