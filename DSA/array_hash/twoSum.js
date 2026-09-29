// TWO SUM - You're given an array of integers and a target. Return the indices of the two numbers
// that add up to the target. Assume there is exactly one valid answer.

/*
Brute Force

Time complexity = O(n^2) - worst case: for each element, we may have to add it against many of the
remaining elements to find the target sum

Space complexity = O(1) - worst case: we are only using storage for i,j, and sum regardless of how
many elements the input contains, the space needed doesn't grow with n.
*/

function twoSumBrute(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const sum = nums[i] + nums[j];
            if (sum === target) {
                return [i, j];
            }
        }
    }
}

/*
Optimized solution using Set

Time complexity = O(n) - worst case: we loop through the entire input array

Space complexity = O(n) - worst case: the Map grows with n therefore it all depends how many
elements are in the input. i and complement are only being set once per iteration so they do not
grow with n.
*/

function twoSumMapOptimized(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return [map.get(nums[i]), i];
        }
        const complement = target - nums[i];
        map.set(complement, i);
    }
}
