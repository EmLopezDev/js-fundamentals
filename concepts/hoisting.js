/* Hoisting is a JavaScript mechanism where the interpreter allocates memory for variable and
function declarations before executing the code. Commonly, it is often described as behavior
where declarations appear to be "moved" to the top of their respective scope (global or function).*/

/* Function Declarations are fully hoisted, meaning the Javascript engine stores both the function
name and its complete body in memory during the compile phase. For this reason you are able to
invoke a function before it appears in the code */

greet(); // Output: "Hello!"

function greet() {
    console.log("Hello!");
}

/* var, let, and const are also hoisted. When var is hoisted it is initialized as undefined, let and
const however are left uninitialized in a state called the temporal dead zone (TDZ) and throw a
reference error if they are being accessed before being initialized. The reason behind var being
designed this way was to prevent the environment from completely crashing with fatal memory errors
if a developer tried to use a variable slightly out of order in Javascript's inception.

Unless you are maintaining legacy code, let and const are the preferred ways of declaring a variable
to catch unintended pre-declaration access early.
*/

var user; // Hoisted declaration initialized to undefined
console.log(user); // undefined
user = "Alice"; // Initialization stays in place
console.log(user); // "Alice"

console.log(age); // Uncaught ReferenceError: Cannot access 'age' before initialization
let age = 25;

/* Function Expressions and Arrow Functions have the same behavior as var, let, and const. Because
they are stored in a variable the variable itself gets hoisted but the function body itself doesn't.
Meaning if its is stored in a var, the var itself gets hoisted and initialized with undefined, while
let and const also get hoisted but remain uninitialized.*/

sayHi(); // Uncaught TypeError: sayHi is not a function. Because it is currently undefined

var sayHi = function () {
    console.log("Hi!");
};

sayBye(); // Uncaught ReferenceError: Cannot access 'sayBye' before initialization

const sayBye = function () {
    console.log("Bye!");
};
