/*
Valid Palindrome

A palindrome reads the same forward and backward.

Given a string s, return true if it is a palindrome and false otherwise.

For this problem, you should:
- Ignore spaces and punctuation
- Ignore uppercase vs lowercase
- Consider only letters and numbers

Example1

Input:
s = "A man, a plan, a canal: Panama"

After cleaning:
s = amanaplanacanalpanama

Output:
true

Example 2

Input:
s = "race a car"

After cleaning:
s = raceacar

Output:
false

Example 3

Input:
s = " "

Output:
true - empty string is considered a palindrome
*/

/*
Brute Force way

Time complexity =

Space complexity =
*/
// Using Regex
function isPalindromeBrute(s) {
    const regex = /^[a-zA-Z0-9]+$/;
    let clean = "";

    for (const char of s) {
        if (regex.test(char)) {
            clean += char.toLowerCase();
        }
    }

    const reversed = clean.split("").reverse().join("");

    return clean === reversed;
}

// Another option not using Regex in case it is prohibited
const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

function isPalindromeBrute2(s) {
    let clean = "";

    for (const char of s) {
        if (chars.includes(char.toLowerCase())) {
            clean += char.toLowerCase();
        }
    }

    const reversed = clean.split("").reverse().join("");

    return clean === reversed;
}
