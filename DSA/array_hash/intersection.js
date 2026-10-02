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

/*
Optimized Way

Time complexity = O(n + m) - worst case: creating the set required going through nums2 which is o(m)
and the for...in loop runs n times which is O(n). Giving us O(n + m)

Space complexity = O(n + m) worst case: cache will grow n time with nums2 depending on its size, and
results will grow m times depending on the number of matches found. Giving use O(n + m);

If only auxiliary space is being accounted then the Space complexity is O(m)
*/

function intersectionOptimized(nums1, nums2) {
    const results = [];

    const cache = new Set(nums2);

    for (const num of nums1) {
        if (cache.has(num)) {
            results.push(num);
            cache.delete(num);
        }
    }

    return results;
}
