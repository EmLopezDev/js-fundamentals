/*
INTERSECTION OF TWO ARRAYS - Given two arrays, return an array containing the values that appear in
both arrays. Each value should appear in the result only once.

Examples:

nums1 = [1, 2, 2, 1];
nums2 = [2, 2];

// [2]

nums1 = [4, 9, 5];
nums2 = [9, 4, 9, 8, 4];

// [4, 9]
// order doesn't matter
*/

/*
Brute Force way

Time complexity = O(n^3) simplified or O(n,o,min(n,o)) if each array is a different size - worst
case: we have two nested loops plus another linear search through the result.

Space complexity = O(n) simplified or O(min(n,o)) - worst case: the result can contain at most as
many unique values as the smaller input array.
*/

function intersectionBrute(nums1, nums2) {
    const result = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                if (!result.includes(nums1[i])) {
                    result.push(nums1[i]);
                }
                // If I found a match, add it if necessary, then stop searching nums2 regardless.
                break;
            }
        }
    }
    return result;
}
