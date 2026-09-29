/*
CONTAIN DUPLICATE - Given an array of numbers, return true if any number appears more than once.
Otherwise return false.
*/

/*
Brute force way

Time complexity = O(n^2) - worst case: for each element, we may compare it against many of the
remaining elements

Space complexity = O(1) - worst case: we are only using storage for i and j regardless of how many
elements the input contains, the space needed doesn't grow with n.
*/

function containsDuplicateBrute(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }
    return false;
}

/*
Optimized solution using Set

Time complexity = O(n) - worst case: we loop through the entire input array

Space complexity = O(n) - worst case: the Set grows with n therefore it all depends how many
elements are in the input. i is only set once per iteration, it doesn't grow with n

*/

function containsDuplicateOptimized(nums) {
    let set = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) {
            return true;
        } else {
            set.add(nums[i]);
        }
    }
    return false;
}
