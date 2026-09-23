/*
A callback function is a function passed as an argument to another function, which is then executed
(or "called back") inside the outer function to complete an action.

Because functions are "first-class citizens" in JavaScript, they can be treated like any other
variable—meaning you can pass them into other functions, return them, and assign them to variables.
*/

// Simple example
// Callback function
function greet(name) {
    console.log(`Hello, ${name}`);
}

// High Order function
function processUser(name, callback) {
    callback(name);
}

processUser("John", greet);

// callback function
processUser("John", function (name) {
    console.log(`Hello, ${name}`);
});

// callback arrow function
processUser("John", (name) => {
    console.log(`Hello, ${name}`);
});

// these are all valid callbacks

/*
One thing to keep in mind is the difference between passing a function vs. calling a function. In
the following example although it may look the same at a glance, the first is passing the function
to run later, the other is running the function and passing in the returned value of that function
if there is one.
*/

processUser("John", greet); // passing in function or callback for later use
processUser("John", greet()); // invoking the function immediately, and passing the return value

// There are two major types of Callbacks

//Synchronous: A synchronous callback executes during the execution of the function that receives
//it.

function calculate(a, b, callback) {
    return callback(a, b);
}

const result = calculate(5, 3, (a, b) => a + b);

// Asynchronous: An asynchronous callback does not execute immediately

setTimeout(() => {
    console.log("Hello");
}, 1000);

/*
Callback hell: a term used for deeply nested callbacks, although since the introduction of Promises
this is no longer really something that is a problem but it's good to be aware of it.
*/
// older Callback hell
getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            processPayment(details, (result) => {
                console.log(result);
            });
        });
    });
});

// Promise based version
getUser(userId).then(getOrders).then(getOrderDetails).then(processPayment).then(console.log);

// async/await based version
const user = await getUser(userId);
const orders = await getOrders(user.id);
const details = await getOrderDetails(orders[0].id);
const result1 = await processPayment(details);

/*
Questions You Should Be Able to Answer

What is a callback?

- A callback is a function passed as an argument to another function so that the receiving function
  can execute it.

Are callbacks always asynchronous?

- No.

- This is an important interview question.

    Callbacks can be synchronous:

    array.map(callback);

    or asynchronous:

    setTimeout(callback, 1000);

What's the difference between a callback and a HOF?

- The HOF receives or returns functions. A callback is a function passed into another function to be
  executed.

What's a synchronous callback?

- A callback executed during the current operation, such as a callback passed to map().

What's an asynchronous callback?

- A callback scheduled or registered to execute later, such as a setTimeout or event-listener
  callback.

Are callbacks the same thing as closures?

- No. Callback describes how a function is being used. Closure describes which surrounding variables
  the function retains access to. A callback can also form a closure.

Why do callbacks exist?

- They allow behavior to be passed into another function, making code reusable and allowing code to
  execute in response to events or completed operations.

*/
