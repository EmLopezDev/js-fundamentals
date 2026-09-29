/*
VALID ANAGRAM - An anagram means two strings contain exactly the same characters with exactly the
same frequencies, just potentially in a different order.

s = "anagram"
t = "nagaram"

// true

s = "rat"
t = "car"

// false
*/

/*
Brute Force

Time complexity = O(n log n) - worst case: .sort() is typically O(n log n) because it processes
roughly n elements across about log n stages, where each stage represents another division of the
data into smaller parts.

split() + sort() + join() = O(n) + O(n log n) + O(n), we do this twice so technically it is O(2n) +
O(2n log n) + O(2n), but we drop the constants of 2 bringing us back down to O(n) + O(n log n) +
O(n), and since Big O keeps whatever grows faster and dominates so we drop both O(n) and only keep
O(n log n)


Space complexity = O(n) - worst case: sorted1 and sorted2's size grows with the input. Its
technically O(2n) because we have two strings but Big O ignores the 2 constant
*/
function isAnagramBrute(str1, str2) {
    if (str1.length !== str2.length) return false;

    const sorted1 = str1.split("").sort().join("");
    const sorted2 = str2.split("").sort().join("");

    return sorted1 === sorted2;
}

/*
Optimized solution using Set

Time complexity = O(n) - worst case: we loop through str1 and str2 giving us O(2n) which reduces to
O(n)

Space complexity = O(n) - worst case: the frequency map can store up to n unique characters.
*/
function isAnagramOptimized(str1, str2) {
    if (str1.length !== str2.length) return false;

    const map = new Map();

    for (const char of str1) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (const char of str2) {
        if (!map.has(char)) {
            return false;
        }

        map.set(char, map.get(char) - 1);

        if (map.get(char) === 0) {
            map.delete(char);
        }
    }

    return true;
}
