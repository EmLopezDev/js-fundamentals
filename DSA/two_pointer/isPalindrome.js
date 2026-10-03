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

Time complexity = O(n) - worst case: We loop through the input to clean it, and reversing/comparing
the cleaned string also takes linear time. Since the cleaned string cannot be larger than the
original, everything simplifies to O(n).

Space complexity = O(n) - worst case: We create additional data (variable clean, the split array, and
reversed) that can grow proportionally with the input, so the extra memory is O(n)
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

/*
Optimized way

Time complexity = O(n) - worst case: The two pointers traverse the string from opposite ends toward
the middle. The amount of work grows linearly with the length of the input.

Space complexity = O(1) - worst case: We only use a constant amount of additional memory for the two
pointers and regex; no additional data structure grows with the input.
*/

// Single while loop
function isPalindromeOptimized1(s) {
    const regex = /^[a-zA-Z0-9]$/;
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (!regex.test(s[left])) {
            left++;
            continue;
        }
        if (!regex.test(s[right])) {
            right--;
            continue;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }
    return true;
}

/*
Nested while loops:  Use inner while loops to skip invalid characters. Each inner loop must also
check left < right because the pointers can cross while skipping.
*/
function isPalindromeOptimized2(s) {
    const regex = /^[a-zA-Z0-9]$/;
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !regex.test(s[left])) {
            left++;
        }
        while (left < right && !regex.test(s[right])) {
            right--;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }
    return true;
}
