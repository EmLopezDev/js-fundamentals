/*
The JavaScript Call Stack is a mechanism the JavaScript engine uses to keep track of function
invocations and manage execution contexts. View the Call Stack as the JavaScript engine's to do
list. Because JavaScript is a single threaded language, the engine can only take action on one to do
at a time. The Call Stack operates as a Last In First Out or LIFO structure, where the last action
added to the stack is the first action to be taken. The Call Stack can only take action on
synchronous code, when an asynchronous action is encountered it is still placed on to the Call
Stack, however the the runtime environment notices and it hands it off to the Web API to handle,
once the async action is complete, it then gets put into a queue where the event loop monitors it
and eventually puts it back on to the call stack when it is ready to be executed.
*/

function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(n) {
    const result = square(n);
    console.log(result);
}

printSquare(5);

/*

1. The script starts running: The engine creates the Global Execution Context and pushes it to the
   bottom of the call stack.
2. printSquare(5) is invoked: The engine creates a stack frame for printSquare and pushes it onto
   the top of the stack.
3. square(5) is invoked: Inside printSquare, the code calls square. The engine creates a frame for
   square and pushes it to the top, temporarily pausing printSquare
4. multiply(5, 5) is invoked: Inside square, the code calls multiply. The engine creates a frame for
   multiply and pushes it to the top, temporarily pausing square.
5. multiply returns: The multiply function completes, returns 25, and its frame is popped off the
   top of the stack. Execution resumes inside square.
6. square returns: The square function completes, returns 25 to the result variable, and its frame
   is popped off the stack. Execution resumes inside printSquare.
7. console.log(25) executes: The engine logs the result to the console, briefly pushing and popping
   console.log from the top of the stack.
8. printSquare finishes: The printSquare function reaches the end of its code, and its frame is
   popped off the stack. 9.The script completes: Only the Global Execution Context remains until the
   browser tab or program is closed.

*/
